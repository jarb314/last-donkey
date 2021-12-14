// To parse this data:
//
//   const Convert = require("./file");
//
//   const purchase = Convert.toPurchase(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
function toPurchase(json) {
  return cast(JSON.parse(json), a(r("Purchase")));
}

function purchaseToJson(value) {
  return JSON.stringify(uncast(value, a(r("Purchase"))), null, 2);
}

function invalidValue(typ, val, key = "") {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ
      )} but got ${JSON.stringify(val)}`
    );
  }
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`
  );
}

function jsonToJSProps(typ) {
  if (typ.jsonToJS === undefined) {
    const map = {};
    typ.props.forEach((p) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ) {
  if (typ.jsToJSON === undefined) {
    const map = {};
    typ.props.forEach((p) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val, typ, getProps, key = "") {
  function transformPrimitive(typ, val) {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs, val) {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases, val) {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ, val) {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue("array", val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val) {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue("Date", val);
    }
    return d;
  }

  function transformObject(props, additional, val) {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue("object", val);
    }
    const result = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === "object" && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast(val, typ) {
  return transform(val, typ, jsonToJSProps);
}

function uncast(val, typ) {
  return transform(val, typ, jsToJSONProps);
}

function a(typ) {
  return { arrayItems: typ };
}

function u(...typs) {
  return { unionMembers: typs };
}

function o(props, additional) {
  return { props, additional };
}

function m(additional) {
  return { props: [], additional };
}

function r(name) {
  return { ref: name };
}

const typeMap = {
  Purchase: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "date", js: "date", typ: Date },
      { json: "dueDate", js: "dueDate", typ: Date },
      { json: "datetime", js: "datetime", typ: u(undefined, Date) },
      { json: "observations", js: "observations", typ: "" },
      { json: "anotation", js: "anotation", typ: "" },
      { json: "termsConditions", js: "termsConditions", typ: "" },
      { json: "status", js: "status", typ: "" },
      { json: "client", js: "client", typ: r("Client") },
      {
        json: "numberTemplate",
        js: "numberTemplate",
        typ: u(a(r("NumberTemplateElement")), r("NumberTemplateElement")),
      },
      { json: "retentions", js: "retentions", typ: a(r("Retention")) },
      { json: "seller", js: "seller", typ: r("Seller") },
      { json: "priceList", js: "priceList", typ: r("PriceList") },
      { json: "currency", js: "currency", typ: r("Currency") },
      { json: "total", js: "total", typ: 0 },
      { json: "totalPaid", js: "totalPaid", typ: 0 },
      { json: "balance", js: "balance", typ: 0 },
      { json: "decimalPrecision", js: "decimalPrecision", typ: 0 },
      { json: "items", js: "items", typ: a(r("Item")) },
      { json: "payments", js: "payments", typ: a(r("Payment")) },
    ],
    false
  ),
  Client: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "name", js: "name", typ: "" },
      { json: "identification", js: "identification", typ: "" },
      { json: "email", js: "email", typ: "" },
      { json: "phonePrimary", js: "phonePrimary", typ: "" },
      { json: "phoneSecondary", js: "phoneSecondary", typ: "" },
      { json: "fax", js: "fax", typ: "" },
      { json: "mobile", js: "mobile", typ: "" },
      { json: "address", js: "address", typ: r("Address") },
      { json: "observations", js: "observations", typ: u(undefined, "") },
    ],
    false
  ),
  Address: o(
    [
      { json: "address", js: "address", typ: "" },
      { json: "city", js: "city", typ: "" },
    ],
    false
  ),
  Currency: o(
    [
      { json: "code", js: "code", typ: "" },
      { json: "symbol", js: "symbol", typ: "" },
      { json: "exchangeRate", js: "exchangeRate", typ: 0 },
    ],
    false
  ),
  Item: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "name", js: "name", typ: "" },
      { json: "description", js: "description", typ: "" },
      { json: "reference", js: "reference", typ: "" },
      { json: "tax", js: "tax", typ: a(r("Tax")) },
      { json: "price", js: "price", typ: 0 },
      { json: "quantity", js: "quantity", typ: 0 },
    ],
    false
  ),
  Tax: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "name", js: "name", typ: "" },
      { json: "percentage", js: "percentage", typ: 0 },
      { json: "description", js: "description", typ: "" },
      { json: "type", js: "type", typ: u(undefined, "") },
      { json: "status", js: "status", typ: "" },
    ],
    false
  ),
  NumberTemplateElement: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "prefix", js: "prefix", typ: "" },
      { json: "number", js: "number", typ: 0 },
      { json: "text", js: "text", typ: "" },
    ],
    false
  ),
  Payment: o(
    [
      { json: "id", js: "id", typ: "" },
      { json: "number", js: "number", typ: "" },
      { json: "date", js: "date", typ: Date },
      { json: "amount", js: "amount", typ: "" },
      { json: "paymentMethod", js: "paymentMethod", typ: "" },
      { json: "observations", js: "observations", typ: "" },
      { json: "anotation", js: "anotation", typ: "" },
      { json: "status", js: "status", typ: "" },
    ],
    false
  ),
  PriceList: o(
    [
      { json: "id", js: "id", typ: u(undefined, 0) },
      { json: "name", js: "name", typ: u(undefined, "") },
    ],
    false
  ),
  Retention: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "name", js: "name", typ: "" },
      { json: "percentage", js: "percentage", typ: 3.14 },
      { json: "amount", js: "amount", typ: 3.14 },
    ],
    false
  ),
  Seller: o(
    [
      { json: "id", js: "id", typ: "" },
      { json: "name", js: "name", typ: "" },
      { json: "identification", js: "identification", typ: "" },
      { json: "observations", js: "observations", typ: "" },
    ],
    false
  ),
};

module.exports = {
  purchaseToJson: purchaseToJson,
  toPurchase: toPurchase,
};

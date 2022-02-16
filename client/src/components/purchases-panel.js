import { currencyFormatter, dateFormatter } from "../util/main";

// const purchases = [
//   {
//     ncf: "B0100004923",
//     date: "12/09/21",
//     amount: "$1,302.00",
//   },
//   {
//     ncf: "B0100004923",
//     date: "12/09/21",
//     amount: "$1,302.00",
//   },
//   {
//     ncf: "B0100004923",
//     date: "12/09/21",
//     amount: "$1,302.00",
//   },
//   {
//     ncf: "B0100004923",
//     date: "12/09/21",
//     amount: "$1,302.00",
//   },
// ];

function PurchasesPanel(props) {
  const purchases = [...props.purchases];
  return (
    <div id="purchases-panel">
      <h2>Historial de compra</h2>
      <ul>
        {purchases.map((p, i) => {
          return (
            <li key={i}>
              <PurchaseRow ncf={p.number} date={p.date} amount={p.total} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PurchaseRow(props) {
  return (
    <div className="purchase-container d-flex">
      <p className="w-100">{props.ncf}</p>
      <p className="w-100">{dateFormatter(props.date)}</p>
      <p className="w-100 text-right">{currencyFormatter(props.amount)}</p>
    </div>
  );
}

export default PurchasesPanel;

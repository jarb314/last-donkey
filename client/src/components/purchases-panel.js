const purchases = [
  {
    ncf: "B0100004923",
    date: "12/09/21",
    amount: "$1,302.00",
  },
  {
    ncf: "B0100004923",
    date: "12/09/21",
    amount: "$1,302.00",
  },
  {
    ncf: "B0100004923",
    date: "12/09/21",
    amount: "$1,302.00",
  },
  {
    ncf: "B0100004923",
    date: "12/09/21",
    amount: "$1,302.00",
  },
];

function PurchasesPanel() {
  return (
    <div id="purchases-panel">
      <h2>Historial de compra</h2>
      <ul>
        {purchases.map((p) => {
          return (
            <li>
              <PurchaseRow ncf={p.ncf} date={p.date} amount={p.amount} />
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
      <p className="w-50">{props.ncf}</p>
      <p className="w-25">{props.date}</p>
      <p className="w-25">{props.amount}</p>
    </div>
  );
}

export default PurchasesPanel;

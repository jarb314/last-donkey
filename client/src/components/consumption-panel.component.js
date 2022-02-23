import { currencyFormatter } from "../util";

function ConsumptionPanel(props) {
  const { consumption } = props;
  const min = 1500;
  const percent = Math.abs(((min - consumption) / min) * 100 - 100);
  console.log(percent);
  return (
    <div id="consumption-panel" className="panel light">
      <h2>Consumo del mes</h2>
      <p>
        {currencyFormatter(props.consumption)}
        <span>/{currencyFormatter(min)}</span>
      </p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
}

export default ConsumptionPanel;

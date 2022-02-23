function ConsumptionPanel(props) {
  return (
    <div id="consumption-panel" className="panel light">
      <h2>Consumo del mes</h2>
      <p>
        ${props.consumption}
        <span>/$1,500.00</span>
      </p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: "52%" }}
          aria-valuenow="52"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
}

export default ConsumptionPanel;

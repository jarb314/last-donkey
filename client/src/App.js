import React from "react";
import "./App.scss";
import Navbar from "./components/navbar";
import MemberInfoPanel from "./components/member-info-panel";
import PointsPanel from "./components/points-panel";
import ConsumptionPanel from "./components/consumption-panel";
import PurchasesPanel from "./components/purchases-panel";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="conatiner row g-0">
        <MemberInfoPanel />
        <PointsPanel />
        <ConsumptionPanel />
        <PurchasesPanel />
      </div>
    </div>
  );
}

export default App;

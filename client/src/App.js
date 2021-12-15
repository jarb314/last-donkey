import React from "react";
import "./App.scss";
import Navbar from "./components/navbar";
import MemberInfoPanel from "./components/member-info-panel";
import PointsPanel from "./components/points-panel";
import ConsumptionPanel from "./components/consumption-panel";
import PurchasesPanel from "./components/purchases-panel";
import { Counter } from "./counter/Counter";

function App() {
  // const [data, setData] = React.useState(null);
  const [member, setMember] = React.useState({});
  const [purchases, setPurchases] = React.useState([]);

  React.useEffect(() => {
    fetch("api/members/cn-0006")
      .then((res) => res.json())
      .then((data) => {
        setMember(data);
      });
  }, []);

  React.useEffect(() => {
    fetch("api/members/214/purchases")
      .then((res) => res.json())
      .then((data) => {
        setPurchases(data);
      });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="conatiner row g-0">
        <MemberInfoPanel member={member} />
        {/* <Counter /> */}
        <PointsPanel />
        <ConsumptionPanel />
        <PurchasesPanel purchases={purchases} />
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.component";
import MemberInfoPanel from "../components/member-info-panel.component";
import PointsPanel from "../components/points-panel.component";
import ConsumptionPanel from "../components/consumption-panel.component";
import PurchasesPanel from "../components/purchases-panel.component";
import { getCurrentUser } from "../services/auth.service";
import { getMemberByCode } from "../services/member.service";

function MemberView(props) {
  let navigate = useNavigate();
  React.useEffect(() => {
    let user = getCurrentUser();
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [member, setMember] = useState({});
  useEffect(() => {
    const code = props.member["code"];
    getMemberByCode(code).then((response) => {
      console.log(response);
      setMember(response.data);
    });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="conatiner row g-0">
        <MemberInfoPanel member={member} />
        <PointsPanel />
        <ConsumptionPanel />
        <PurchasesPanel purchases={member["purchases"]} />
      </div>
    </div>
  );
}

export default MemberView;

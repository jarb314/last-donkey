import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar.component";
import MemberInfoPanel from "../components/member-info-panel.component";
import PointsPanel from "../components/points-panel.component";
import ConsumptionPanel from "../components/consumption-panel.component";
import PurchasesPanel from "../components/purchases-panel.component";
import { getCurrentUser } from "../services/auth.service";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getMemberByCode } from "../services/member.service";

function MemberView(props) {
  const { code } = useParams();
  let navigate = useNavigate();

  React.useEffect(() => {
    let user = getCurrentUser();
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const [member, setMember] = useState();
  useEffect(() => {
    getMemberByCode(code || getCurrentUser().username)
      .then((response) => {
        console.log(response);
        setMember(response.data);
      })
      .catch((err) => {
        console.log("Upps, an error");
        navigate("/404");
      });
  }, [code, navigate]);

  return (
    <div className="App">
      <Navbar route="members" />
      {!member ? (
        <div className="content container">
          <Box
            sx={{
              display: "flex",
              "align-items": "center",
              "justify-content": "center",
              "min-height": "400px"
            }}
          >
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <div className="content conatiner row p-0">
          <div className="col-lg-5 col-md-5">
            <MemberInfoPanel member={member} />
            <PointsPanel points={member.points} />
          </div>
          <div className="col-lg-7 col-md-7">
            <ConsumptionPanel consumption={member.monthConsumpsion} />
            <PurchasesPanel purchases={member["purchases"]} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberView;

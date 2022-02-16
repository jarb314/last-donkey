import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.scss";
import Navbar from "../components/navbar";
import MemberInfoPanel from "../components/member-info-panel";
import PointsPanel from "../components/points-panel";
import ConsumptionPanel from "../components/consumption-panel";
import PurchasesPanel from "../components/purchases-panel";
import { app } from "../services/firebase-config";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

function MemberView(props) {
  // React.useEffect(() => {
  //   // const db = getFirestore(app);
  //   // // db.collection("members").onSnapshot((snapshot) => {
  //   // //   console.log(snapshot);
  //   // // });
  //   // // Get a list of cities from your database
  //   // async function getCities(db) {
  //   //   const querySnapshot = await getDocs(collection(db, "members"));
  //   //   querySnapshot.forEach((doc) => {
  //   //     console.log(`${doc.id} => ${doc.data()["code"]}`);
  //   //   });
  //   // }
  //   // getCities(db);
  // });

  // let navigate = useNavigate();
  // React.useEffect(() => {
  //   // let authToken = sessionStorage.getItem("Auth Token");
  //   // console.log("hello" + authToken);
  //   // if (authToken) {
  //   //   navigate("/member-view");
  //   // }
  //   // if (!authToken) {
  //   //   navigate("/login");
  //   // }
  // }, [navigate, props.member]);

  const [member, setMember] = useState({});
  useEffect(() => {
    // console.log(props.member);
    fetch(`api/members/${props.member["code"]}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMember(data);
      });
  }, []);

  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    fetch(`api/members/${props.member["id"]}/purchases`)
      .then((res) => res.json())
      .then((data) => {
        // setPurchases(data);
      });
  }, []);

  // const member = {};
  // const purchases = [];

  return (
    <div className="App">
      <Navbar />
      <div className="conatiner row g-0">
        <MemberInfoPanel member={member} />
        <PointsPanel />
        <ConsumptionPanel />
        <PurchasesPanel purchases={purchases} />
      </div>
    </div>
  );
}

export default MemberView;

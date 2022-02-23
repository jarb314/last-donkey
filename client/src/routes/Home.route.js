import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import { getMembers } from "../services/member.service";
import Navbar from "../components/navbar.component";

function Home(props) {
  let [user, setUser] = useState({});

  let navigate = useNavigate();
  useEffect(() => {
    let result = getCurrentUser();
    if (result) {
      if (result.roles.includes("ROLE_USER")) {
        navigate("/member", { code: "cn-0007" });
      }
      // else if (result.roles.includes("ROLE_ADMIN")) {
      //   navigate("/");
      // }
      setUser(result);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  let [members, setMembers] = useState([]);
  useEffect(() => {
    getMembers().then((members) => {
      console.log(members);
      setMembers(members.data);
    });
  }, []);

  function showMember(e) {
    console.log(e.target.value);
    navigate("/member/" + e.target.value);
  }

  return (
    <div>
      <Navbar title="Home" />
      <h1>{user.username}</h1>
      <div id="members-container">
        {members.map((member) => {
          return (
            <button key={member.code} onClick={showMember} value={member.code}>
              {member.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Home;

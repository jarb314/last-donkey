import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import { getMembers } from "../services/member.service";
import Navbar from "../components/navbar.component";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Eye, Plus } from "react-feather";

function Home(props) {
  // let [user, setUser] = useState({});

  let navigate = useNavigate();
  useEffect(() => {
    let result = getCurrentUser();
    if (result) {
      if (result.roles.includes("ROLE_USER")) {
        navigate("/member/" + result.username);
      }
      // else if (result.roles.includes("ROLE_ADMIN")) {
      //   navigate("/");
      // }
      // setUser(result);
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
    // console.log(e.target);
    // const code = e.target.value;
    navigate("/member/" + e);
  }

  function showNewMember() {
    navigate("/member/add");
  }

  return (
    <div id="home">
      <Navbar route="home" />
      <div className="content m-3" id="members-container">
        <h1>Todos los miembros</h1>
        <p>Listado completo de todos los miembros registrados en el Club</p>
        <hr />
        <div className="actions">
          <TextField
            id="search"
            label="Buscar"
            variant="outlined"
            size="small"
            onChange={(e) => {}}
          />
          <Button
            variant="contained"
            id="create-member-btn"
            onClick={showNewMember}
            size="normal"
            disableElevation
          >
            <Plus /> Nuevo Miembro
          </Button>
        </div>
        {/* <div className="row g-0 header">
          <div className="col-5">Código</div>
          <div className="col-7">Nombre</div>
        </div> */}
        <div>
          {members.map((member) => {
            return (
              <button
                className="member-btn"
                key={member.code}
                onClick={() => showMember(member.code)}
                value={member.code}
              >
                {/* {member.name} */}
                <div className="row g-0">
                  <div className="col-sm-3 col-4">{member.code}</div>
                  <div className="col-sm-8 col-7">
                    <p className="name">{member.name}</p>
                  </div>
                  <div className="col-1">
                    <Eye />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;

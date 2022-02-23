import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import Navbar from "../components/navbar.component";

function Home(props) {
  let [user, setUser] = useState({});

  let navigate = useNavigate();
  useEffect(() => {
    let result = getCurrentUser();
    if (result.roles.includes("ROLE_USER")) {
      navigate("/memberview", { code: "cn-0007" });
    } else if (result.roles.includes("ROLE_ADMIN")) {
      navigate("/");
    }
    setUser(result);
  }, []);

  return (
    <div>
      <Navbar title="Home" />
      <h1>{user.username}</h1>
    </div>
  );
}

export default Home;

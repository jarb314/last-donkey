import React from "react";
import "../styles/index.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import MemberView from "./MemberView.route";
import Login from "./Login.route";

function App() {
  const navigate = useNavigate();
  React.useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/member-view");
    }
  });

  const member = {
    id: "209",
    code: "CN-0003",
    name: "Dorcas Carmona (CN-0003)",
    address: "c/ Telésforo Jaime #19 Bayona. Frente a la farmacia Nokaury",
    phone: "8295744171",
    email: "dorkacarmonajaimedepena@gmail.com"
  };

  // const [member, setMember] = React.useState({});
  // React.useEffect();

  return (
    <div className="App">
      <Routes>
        <Route path="/member-view" element={<MemberView member={member} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

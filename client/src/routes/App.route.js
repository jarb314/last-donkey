import React from "react";
import "../styles/index.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import MemberView from "./MemberView.route";
import Login from "./Login.route";
import Home from "./Home.route";
import NotFound from "./NotFound.route";

function App() {
  const navigate = useNavigate();
  React.useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/memberview");
    }
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memberview" element={<MemberView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

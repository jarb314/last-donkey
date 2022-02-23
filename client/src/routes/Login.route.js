import React from "react";
import Form from "../components/common/form.component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import { getCurrentUser } from "../services/auth.service";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleAction = () => {
    signIn(email, password)
      .then((response) => {
        console.log(response);
        console.log("Loged");
        if (response.roles.includes("ROLE_USER")) {
          navigate("/member/" + response.username);
        } else if (response.roles.includes("ROLE_ADMIN")) {
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error["message"]);
        console.log({ error });
      });
  };

  React.useEffect(() => {
    let user = getCurrentUser();
    if (user) {
      navigate("/memberview");
    }
  }, [navigate]);

  return (
    <div id="login-container">
      <h1>Club Nature</h1>
      <ToastContainer />
      <Form
        setEmail={setEmail}
        setPassword={setPassword}
        handleAction={() => handleAction()}
      />
    </div>
  );
}

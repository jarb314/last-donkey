import React from "react";
import Form from "../components/common/form.component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
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
        navigate("/member-view");
      })
      .catch((error) => {
        toast.error(error["message"]);
        console.log({ error });
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <ToastContainer />
      <Form
        setEmail={setEmail}
        setPassword={setPassword}
        handleAction={() => handleAction()}
      />
    </div>
  );
}

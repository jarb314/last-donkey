import React from "react";
import "../App.scss";
import Form from "../components/common/form";
import { useState } from "react";
import { app } from "../services/firebase-config";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleAction = () => {
    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        console.log("Loged");
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
        navigate("/member-view");
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          toast.error("Please check the Password");
        }
        if (error.code === "auth/user-not-found") {
          toast.error("Please check the Email");
        }
        if (error.code === "auth/invalid-email") {
          toast.error("This Email is not registered");
        }
        console.log(error);
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

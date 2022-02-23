import authHeader from "./auth-header";
const axios = require("axios").default;
const API_URL = "http://localhost:4000/api/members/";

export const getMembers = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

export const getMemberByCode = (code) => {
  return axios.get(API_URL + code, { headers: authHeader() });
};

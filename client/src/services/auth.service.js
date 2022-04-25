const axios = require("axios").default;
const API_URL = "http://localhost:4000/api/auth/";

export const signIn = async (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username: username,
      password: password
    })
    .then(function (response) {
      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      let message = error.response.data.message;
      console.log(message);
      throw new Error(message);
    });
};
export const logOut = () => {
  sessionStorage.removeItem("user");
};
export const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

// export const authService = {
//   signIn: signIn
// };

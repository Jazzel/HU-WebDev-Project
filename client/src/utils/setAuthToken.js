import axios from "axios";

const setAuthToken = (token) => {
  // axios.create({
  //   baseURL: "http://localhost:5000/api",
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
  // });

  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;

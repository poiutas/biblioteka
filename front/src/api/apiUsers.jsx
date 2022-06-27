import axios from "axios";

const axiosUser = axios.create({
  baseURL: `http://127.0.0.1:3005/api/v1/users`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosUser.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status === 401) {
      window.location.href = "http://127.0.0.1:3005";
    }
    return Promise.reject(error);
  }
);

export default axiosUser;

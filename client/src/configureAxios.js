import axios from "axios";
import config from "./services/config";

export const configureAxios = () => {
  axios.defaults.baseURL = config.API_URL;
  axios.defaults.timeout = 40000;
  axios.defaults.headers.common["Content-Type"] = "application/json";
};

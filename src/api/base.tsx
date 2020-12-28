import axios from "axios";
import { getAuth } from "../utils/auth";

export const getBase = () => {
  return "http://localhost:8080";
};

class API {
  get(url: string) {
    return axios({
      headers: {
        "x-auth-token": getAuth().authToken,
      },
      method: "get",
      url: `${getBase()}${url}`,
    });
  }

  post(url: string, data: unknown) {
    return axios({
      headers: {
        "x-auth-token": getAuth().authToken,
      },
      method: "post",
      url: `${getBase()}${url}`,
      data,
    });
  }

  patch(url: string, data: unknown) {
    return axios.patch(`${getBase()}${url}`, data, {
      headers: {
        "x-auth-token": getAuth().authToken,
      },
    });
  }

  delete(url: string, data?: unknown) {
    return axios({
      headers: {
        "x-auth-token": getAuth().authToken,
      },
      method: "delete",
      url: `${getBase()}${url}`,
      data,
    });
  }
}

const api = new API();

export default api;

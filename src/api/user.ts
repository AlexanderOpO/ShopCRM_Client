import axios, { AxiosResponse } from "axios";
import api, { getBase } from "./base";

type ICreateUser = {
  username: string;
  password: string;
};

export type OAuthUser = {
  token: string;
  role: string;
};

const auth = (res: AxiosResponse<OAuthUser>) => {
  localStorage.setItem("auth_token", res.data.token);
  localStorage.setItem("auth_role", res.data.role);
  return res.data;
};

export const register = async (data: ICreateUser) => {
  return api.post("/user/register", data).then(auth);
};

export const login = async (data: ICreateUser) => {
  return api.post("/user/login", data).then(auth);
};

export const getShopList = async () => {
  return api.get("/user/shops").then((res) => res.data);
};

export const removeShop = async (id: string) => {
  return api.post("/user/remove_shop", { shop_id: id });
};

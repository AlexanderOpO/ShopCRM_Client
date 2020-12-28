import { AxiosResponse } from "axios";
import { Product } from "../types/schemas";
import api from "./base";

export const getProduct = (id: string) => {
  return api
    .get(`/product/${id}`)
    .then((res: AxiosResponse<Product>) => res.data);
};

export const getAllProducts = () => {
  return api
    .get(`/product/all`)
    .then((res: AxiosResponse<Product[]>) => res.data);
};

export const removeProduct = async (id: string) => {
  return api.delete(`/product/${id}`).then((res) => res.data?.c_shop || []);
};

export const createProduct = async (data: any) => {
  return api.post("/product", data);
};

export const updateProduct = async (id: string, data: any) => {
  return api.patch(`/product/${id}`, data);
};

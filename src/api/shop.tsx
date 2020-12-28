import axios, { AxiosResponse } from "axios";
import { Product, Shop } from "../types/schemas";
import api, { getBase } from "./base";

export const getShop = (id: string) => {
  return api.get(`/shop/${id}`).then((res: AxiosResponse<Shop>) => res.data);
};

export type ProductType = {
  _id: string;
  id: Product;
  amount: number;
};

export type OShopProductType = {
  [K in keyof Exclude<Shop, "c_product">]: Shop[K];
} & {
  c_product: ProductType[];
};

export const getShopProductList = (id: string | undefined) => {
  return api
    .get(`/shop/products/${id}`)
    .then((res: AxiosResponse<OShopProductType>) => res.data);
};

export const createShop = async (data: any) => {
  return api.post("/shop", data);
};

export const updateShop = async (id: string, data: any) => {
  return api.patch(`/shop/${id}`, data);
};

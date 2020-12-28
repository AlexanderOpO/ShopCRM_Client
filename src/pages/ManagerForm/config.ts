import { removeShop } from "../../api/user";
import { createShop, getShop, updateShop } from "../../api/shop";
import { Product, Shop } from "../../types/schemas";
import {
  createProduct,
  getProduct,
  removeProduct,
  updateProduct,
} from "../../api/product";
import { RolesEnum } from "../../types/identities";

type Config = {
  title: string;
  role: RolesEnum;
  fetchData: (id: string) => Promise<Shop | Product>;
  onDelete: (id: string) => Promise<unknown>;
  onCreate: (data: any) => Promise<unknown>;
  onUpdate: (id: string, data: any) => Promise<unknown>;
  columns: Array<{
    field: string;
    label: string;
    isEditable?: boolean;
  }>;
};

export const ShopConfig: Config = {
  title: "Управление магазинами",
  role: RolesEnum.ShopManager,
  fetchData: getShop,
  onDelete: removeShop,
  onCreate: createShop,
  onUpdate: updateShop,
  columns: [
    {
      field: "_id",
      label: "ID",
    },
    {
      field: "title",
      label: "Название",
      isEditable: true,
    },
    {
      field: "address.country",
      label: "Страна",
      isEditable: true,
    },
    {
      field: "address.city",
      label: "Город",
      isEditable: true,
    },
    {
      field: "address.street",
      label: "Улица",
      isEditable: true,
    },
    {
      field: "address.building",
      label: "Строение",
      isEditable: true,
    },
    {
      field: "description",
      label: "ОГРН",
      isEditable: true,
    },
    {
      field: "created_at",
      label: "Дата создания",
    },
  ],
};

export const ProductConfig: Config = {
  title: "Управление товаром",
  role: RolesEnum.ProductManager,
  fetchData: getProduct,
  onDelete: removeProduct,
  onCreate: createProduct,
  onUpdate: updateProduct,
  columns: [
    {
      field: "_id",
      label: "ID",
    },
    {
      field: "title",
      label: "Название",
      isEditable: true,
    },
    {
      field: "description",
      label: "Описание",
      isEditable: true,
    },
    {
      field: "mass",
      label: "Масса",
      isEditable: true,
    },
    {
      field: "amount",
      label: "Количество",
      isEditable: true,
    },
    {
      field: "created_at",
      label: "Дата создания",
    },
  ],
};

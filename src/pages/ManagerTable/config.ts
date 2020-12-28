import { getShopList, removeShop } from "../../api/user";
import { History } from "history";
import {
  getShopProductList,
  OShopProductType,
  updateShop,
} from "../../api/shop";
import { Shop } from "../../types/schemas";
import {
  getAllProducts,
  removeProduct,
  updateProduct,
} from "../../api/product";
import { RolesEnum } from "../../types/identities";

type Config = {
  title: string;
  role: RolesEnum;
  fetchList: (id?: string) => Promise<unknown[] | OShopProductType>;
  onDelete: (id: string) => Promise<unknown>;
  onUpdate: (id: string, history: History<unknown>) => void;
  onRowClick: (id: string, history: History<unknown>) => void;
  onCreate: (history: History<unknown>) => void;
  getColumns: (data: any) => Array<any>;
  columns: Array<{
    field: string;
    columnName: string;
    isInputNumber?: boolean;
  }>;
};

export const ShopConfig: Config = {
  title: "Список магазинов",
  role: RolesEnum.ShopManager,
  fetchList: getShopList,
  onDelete: removeShop,
  onUpdate: (id, history) => history.push(`/shops/edit/${id}`),
  onRowClick: (id, history) => history.push(`/shops/view/${id}`),
  onCreate: (history) => history.push("/shops/create/"),
  getColumns: (list) => {
    return list.c_shop;
  },
  columns: [
    {
      field: "_id",
      columnName: "ID",
    },
    {
      field: "title",
      columnName: "Название",
    },
    {
      field: "address.country",
      columnName: "Страна",
    },
    {
      field: "address.city",
      columnName: "Город",
    },
    {
      field: "address.street",
      columnName: "Улица",
    },
    {
      field: "address.building",
      columnName: "Строение",
    },
    {
      field: "description",
      columnName: "ОГРН",
    },
    {
      field: "created_at",
      columnName: "Дата создания",
    },
  ],
};

export const ProductAllConfig: Config = {
  title: "Товары на складе",
  role: RolesEnum.ProductManager,
  fetchList: getAllProducts,
  onDelete: removeProduct,
  onUpdate: (id, history) => history.push(`/products/edit/${id}`),
  onRowClick: (id, history) => history.push(`/products/view/${id}`),
  onCreate: (history) => history.push("/products/create/"),
  getColumns: (list) => list,
  columns: [
    {
      field: "_id",
      columnName: "ID",
    },
    {
      field: "title",
      columnName: "Название",
    },
    {
      field: "description",
      columnName: "Описание",
    },
    {
      field: "mass",
      columnName: "Масса",
    },
    {
      field: "amount",
      columnName: "Количество",
    },
    {
      field: "created_at",
      columnName: "Дата создания",
    },
  ],
};

export const ShopProductConfig: Config = {
  title: "Информация о магазине",
  role: RolesEnum.ShopManager,
  fetchList: getShopProductList,
  onDelete: removeProduct,
  onUpdate: (id, history) => history.push(`/products/edit/${id}`),
  onRowClick: (id, history) => history.push(`/products/view/${id}`),
  onCreate: (history) => history.push("/products/create"),
  getColumns: (list) =>
    list.c_product.map((item: any) => ({
      ...item.id,
      totalAmmount: item.amount,
    })),
  columns: [
    {
      field: "_id",
      columnName: "ID",
    },
    {
      field: "title",
      columnName: "Название",
    },
    {
      field: "description",
      columnName: "Описание",
    },
    {
      field: "mass",
      columnName: "Масса",
    },
    {
      field: "amount",
      columnName: "Количество",
    },
    {
      field: "created_at",
      columnName: "Дата создания",
    },
  ],
};

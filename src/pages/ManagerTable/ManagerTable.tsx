import React, { useContext, useEffect, useState } from "react";
import { FC } from "react";
import { IdentitiesEnum } from "../../types/identities";
import _ from "lodash";
import classes from "./ManagerTable.module.scss";
import { Router, useHistory, useParams } from "react-router-dom";
import { getAllProducts } from "../../api/product";
import { getShopList } from "../../api/user";
import { ProductAllConfig, ShopProductConfig, ShopConfig } from "./config";
import {
  getShopProductList,
  OShopProductType,
  ProductType,
} from "../../api/shop";
import { AuthContext } from "../../context/auth";

type IProps = {
  type: IdentitiesEnum;
  amount?: "all" | "not all";
  router?: Router;
};

const ManagerTable: FC<IProps> = ({
  type = IdentitiesEnum.Shop,
  amount = "all",
}) => {
  const [data, setData] = useState<unknown | unknown[]>();
  const [columns, setColumns] = useState<any>([]);
  const history = useHistory();

  const params = useParams<any>();

  const { authRole } = useContext(AuthContext);

  let CONFIG = ShopConfig;
  if (type === IdentitiesEnum.Product && amount === "all")
    CONFIG = ProductAllConfig;
  if (type === IdentitiesEnum.Shop && amount === "not all")
    CONFIG = ShopProductConfig;
  // const CONFIG = ShopConfig;

  const updateData = () => {
    CONFIG.fetchList(params.id).then((data) => {
      setColumns(CONFIG.getColumns(data));
      setData(data);
    });
  };

  useEffect(() => {
    updateData();
  }, [type, amount, history]);

  return (
    <div>
      <h1>{CONFIG.title}</h1>
      {type === IdentitiesEnum.Shop &&
        amount === "not all" &&
        (data as OShopProductType)?.title &&
        (data as OShopProductType)?.description && (
          <>
            <h2>{(data as OShopProductType)?.title}</h2>
            <p>{(data as OShopProductType)?.description}</p>
          </>
        )}
      <div className="actions">
        <button onClick={updateData}>Обновить данные</button>
        <button
          hidden={authRole !== CONFIG.role}
          onClick={() => CONFIG.onCreate(history)}
        >
          Добавить единицу
        </button>
      </div>

      {!!columns.length && (
        <table className={classes.table}>
          <thead>
            <tr>
              <th></th>
              {CONFIG.columns?.map((item) => (
                <th key={item.field}>{item.columnName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {columns.map((item: any) => (
              <tr
                key={item._id}
                className={classes.row}
                onClick={() => CONFIG.onRowClick(item._id, history)}
              >
                <td>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      await CONFIG.onDelete(item._id);
                      updateData();
                    }}
                    hidden={authRole !== CONFIG.role}
                  >
                    Удалить
                  </button>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      await CONFIG.onUpdate(item._id, history);
                      updateData();
                    }}
                    hidden={authRole !== CONFIG.role}
                  >
                    Редактировать
                  </button>
                </td>
                {CONFIG.columns.map((column) => {
                  return (
                    <td key={column.field}>{_.get(item, column.field)}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagerTable;

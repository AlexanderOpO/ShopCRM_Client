import classes from "./ManagerForm.module.scss";
import { useFormik } from "formik";
import _ from "lodash";
import React, { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ActionsEnum, IdentitiesEnum, RolesEnum } from "../../types/identities";
import { ProductConfig, ShopConfig } from "./config";
import { AuthContext } from "../../context/auth";

type IProps = {
  actionType: ActionsEnum;
  type: IdentitiesEnum;
};

const ManagerForm: FC<IProps> = ({
  type = IdentitiesEnum.Shop,
  actionType = ActionsEnum.Create,
}) => {
  const [data, setData] = useState<any>({});
  const { authRole } = useContext(AuthContext);

  const CONFIG = type === IdentitiesEnum.Shop ? ShopConfig : ProductConfig;
  const params = useParams<any>();

  const updateData = () => {
    if (actionType !== ActionsEnum.Create)
      CONFIG.fetchData(params.id).then((data) => {
        setData(data);
      });
  };

  const formik = useFormik({
    initialValues: data,
    onSubmit: async (values) => {
      if (actionType === ActionsEnum.Create) {
        await CONFIG.onCreate(values);
        history.back();
      }
      if (actionType === ActionsEnum.Edit) {
        const buffer: any = {};
        CONFIG.columns.forEach((column) => {
          if (column.isEditable)
            buffer[column.field] =
              _.get(values, column.field) || _.get(data, column.field);
        });
        await CONFIG.onUpdate(params.id, buffer);
        updateData();
        history.back();
      }
    },
  });

  useEffect(() => {
    updateData();
  }, []);
  return (
    <div className={classes.root}>
      <h1>{data?.title}</h1>
      <h2>{data?.description}</h2>
      <form onSubmit={formik.handleSubmit}>
        {CONFIG.columns.map((column) => (
          <div key={column.field}>
            <label htmlFor={column.field}>{column.label}</label>
            <input
              id={column.field}
              name={column.field}
              type={column.field}
              disabled={!column.isEditable}
              onChange={(e) => {
                formik.handleChange(e);
                console.log(formik.values);
              }}
              value={
                _.get(formik.values, column.field) || _.get(data, column.field)
              }
            />
          </div>
        ))}

        {((authRole === CONFIG.role && IdentitiesEnum.Product === type) ||
          (authRole === CONFIG.role && IdentitiesEnum.Shop === type)) && (
          <div className="actions">
            {actionType === ActionsEnum.Create && (
              <button type="submit">Создать</button>
            )}
            {actionType === ActionsEnum.Edit && (
              <button type="submit">Обновить</button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default ManagerForm;

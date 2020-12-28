import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { RoutesEnum } from "../../routes";
import { RolesEnum } from "../../types/identities";
import classes from "./AsideMenu.module.scss";

const AsideMenu = () => {
  const { authRole } = useContext(AuthContext);
  return (
    <div className={classes.root}>
      <Link to={RoutesEnum.ShopList}>Магазины</Link>
      {authRole === RolesEnum.ProductManager && (
        <Link to={RoutesEnum.ProductList}>Склад</Link>
      )}
    </div>
  );
};

export default AsideMenu;

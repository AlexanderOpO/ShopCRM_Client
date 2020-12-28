import React, { FC, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import AsideMenu from "../AsideMenu";
import classes from "./Layout.module.scss";

type IProps = {
  children: any;
};

const Layout: FC<IProps> = ({ children }) => {
  const history = useHistory();
  const { authToken, setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!authToken) history.push("/sign-in");
    else history.push("/shops");
  }, [authToken]);

  return (
    <div className={classes.root}>
      {authToken && <AsideMenu />}
      {children}
    </div>
  );
};

export default Layout;

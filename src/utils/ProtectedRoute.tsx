import React, { FC, ComponentType, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { getAuth } from "./auth";
// import { ROUTES } from '@/constants/routes';

const ProtectedRoute: FC<RouteProps & { component?: ComponentType }> = ({
  component: Component,
  ...rest
}) => {
  const { authToken } = getAuth();

  return !!authToken ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/sign-in" />
  );
};

export default ProtectedRoute;

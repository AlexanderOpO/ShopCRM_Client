/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { ActionsEnum, IdentitiesEnum } from "./types/identities";
import { SignIn as SignInPage } from "./pages/SignIn";
import { AuthContext } from "./context/auth";
import { persistAuth } from "./utils/auth";
import { useCallback } from "react";
import { ManagerForm } from "./pages/ManagerForm";
import { ManagerTable } from "./pages/ManagerTable";
import ProtectedRoute from "./utils/ProtectedRoute";
import Layout from "./ui/Layout";
import { RoutesEnum } from "./routes";

const App = () => {
  const authFirst = useContext(AuthContext);

  const [auth, setAuth] = useState(authFirst);

  const handleSetAuth = (data: unknown) => {
    setAuth(data);
  };
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          setAuth: handleSetAuth,
          authToken: auth.authToken,
          authRole: auth.authRole,
        }}
      >
        <BrowserRouter>
          <Layout>
            <Switch>
              {/* Shop */}
              <ProtectedRoute
                exact
                path={RoutesEnum.ShopList}
                children={
                  <ManagerTable type={IdentitiesEnum.Shop}></ManagerTable>
                }
              />
              <ProtectedRoute
                exact
                path={RoutesEnum.ShopCreate}
                children={
                  <ManagerForm
                    type={IdentitiesEnum.Shop}
                    actionType={ActionsEnum.Create}
                  />
                }
              />
              <ProtectedRoute
                exact
                path={RoutesEnum.ShopEdit}
                children={
                  <ManagerForm
                    type={IdentitiesEnum.Shop}
                    actionType={ActionsEnum.Edit}
                  />
                }
              />
              <ProtectedRoute
                exact
                path={RoutesEnum.ShopView}
                children={
                  <ManagerTable
                    type={IdentitiesEnum.Shop}
                    amount="not all"
                  ></ManagerTable>
                }
              />

              {/* Product */}
              <ProtectedRoute
                exact
                path={RoutesEnum.ProductList}
                children={
                  <ManagerTable
                    type={IdentitiesEnum.Product}
                    amount="all"
                  ></ManagerTable>
                }
              />
              <ProtectedRoute
                exact
                path={RoutesEnum.ProductCreate}
                children={
                  <ManagerForm
                    type={IdentitiesEnum.Product}
                    actionType={ActionsEnum.Create}
                  />
                }
              />
              <ProtectedRoute
                exact
                path={RoutesEnum.ProductEdit}
                children={
                  <ManagerForm
                    type={IdentitiesEnum.Product}
                    actionType={ActionsEnum.Edit}
                  />
                }
              />
              <ProtectedRoute
                exact
                path={RoutesEnum.ProductView}
                children={
                  <ManagerForm
                    type={IdentitiesEnum.Product}
                    actionType={ActionsEnum.Edit}
                  />
                }
              />
              <Route exact path={RoutesEnum.SignIn} children={<SignInPage />} />
              <Route
                exact
                path={"/"}
                children={
                  auth.authToken ? (
                    <Redirect to={"/shops"} />
                  ) : (
                    <Redirect to={RoutesEnum.SignIn} />
                  )
                }
              />
            </Switch>
          </Layout>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
};

export default App;

import React, { useContext, useState } from "react";
import classes from "./ManagerTable.module.scss";
import { useFormik } from "formik";
import { login, OAuthUser, register } from "../../api/user";
import { AuthContext } from "../../context/auth";

enum ActionsEnum {
  Register = "register",
  Login = "login",
}

const SignIn = () => {
  const [actionType, setAction] = useState<ActionsEnum>();
  const { setAuth } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      let data: Partial<OAuthUser> = {};
      if (actionType === ActionsEnum.Login) data = await login(values);
      else if (actionType === ActionsEnum.Register)
        data = await register(values);
      setAuth({
        authToken: data?.token,
        authRole: data?.role,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="username"
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <div className="actions">
        <button type="submit" onClick={() => setAction(ActionsEnum.Register)}>
          Register
        </button>
        <button type="submit" onClick={() => setAction(ActionsEnum.Login)}>
          Login
        </button>
      </div>
    </form>
  );
};

export default SignIn;

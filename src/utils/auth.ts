export const getAuth = () => {
  return {
    authToken: localStorage.getItem("auth_token"),
    authRole: localStorage.getItem("auth_role"),
  };
};

export const persistAuth = (authToken: unknown, authRole: unknown) => {
  return {
    authToken: localStorage.setItem("auth_token", authToken as string),
    authRole: localStorage.setItem("auth_role", authRole as string),
  };
};

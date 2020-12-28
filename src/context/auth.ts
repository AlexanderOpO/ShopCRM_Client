import { createContext } from "react";
import { getAuth } from "../utils/auth";

const INITIAL = {
  ...getAuth(),
  setAuth: () => null,
};

export const AuthContext = createContext<any>(INITIAL);

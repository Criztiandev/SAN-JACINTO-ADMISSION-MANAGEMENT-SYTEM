/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useState, ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface AuthContextType {
  user: string;
  login: (value: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Context Doesnt Exist");
  }
  return context;
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { setItems, removeItem, getItem } = useLocalStorage("auth");
  const [user, setUser] = useState(getItem() || "");

  const login = (UID: string) => {
    setUser(UID);
    setItems(UID);
  };

  const logout = () => {
    removeItem();
    setUser("");
  };

  const value = {
    user: user || "",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

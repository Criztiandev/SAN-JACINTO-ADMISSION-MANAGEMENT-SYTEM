import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: string;
  handleMutateUser: (value: string) => void;
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
  const [user, setUser] = useState("64cb92131f09b7706b48b3f5");

  const handleMutateUser = (UID: string) => setUser(UID);

  const value = {
    user,
    handleMutateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

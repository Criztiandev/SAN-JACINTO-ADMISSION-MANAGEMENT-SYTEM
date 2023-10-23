import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
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
  const [user, setUser] = useState("123123");

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

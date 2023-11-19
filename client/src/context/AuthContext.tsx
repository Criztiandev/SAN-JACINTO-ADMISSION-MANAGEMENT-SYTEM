import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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
  const [user, setUser] = useState("");

  const handleMutateUser = (UID: string) => setUser(UID);
  const value = {
    user,
    handleMutateUser,
  };
  useEffect(() => {
    const _id = sessionStorage.getItem("UID");
    if (_id) {
      setUser(_id);
    }
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

import { createContext, useState } from "react";

const AuthContext = createContext({});

const user = JSON.parse(localStorage.getItem("user"));

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

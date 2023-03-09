import React, { Context, ReactNode, useEffect, useState } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: (email: string, password: string) => void;
};

const AuthContext: Context<AuthContextType> =
  React.createContext<AuthContextType>({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email: string, password: string) => {},
  });

export const AuthContextProvider = (props: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email: string, password: string) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    console.log("LoggedIn");
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

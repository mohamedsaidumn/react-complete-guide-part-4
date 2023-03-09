import React, { Context } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

const AuthContext: Context<AuthContextType> =
  React.createContext<AuthContextType>({
    isLoggedIn: false,
    onLogout: () => {},
  });

export default AuthContext;

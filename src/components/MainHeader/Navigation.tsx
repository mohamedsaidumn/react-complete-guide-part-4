import React, { useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext, { AuthContextType } from "../../store/auth-context";

interface NavigationProps {}

const Navigation = (props: NavigationProps) => {
  const ctx: AuthContextType = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

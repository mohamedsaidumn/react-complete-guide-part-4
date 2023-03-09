import React, { useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
import AuthContext, { AuthContextType } from "../../store/auth-context";

interface HomeProps {}
const Home = (props: HomeProps) => {
  const ctx = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;

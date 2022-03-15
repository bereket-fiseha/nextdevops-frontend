import React, { useState } from "react";
import Navi from "./Nav";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  const [auth, setAuth] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Navi setAuth={setAuth} />
        {children}
      </div>
      <Footer login={auth} />
    </div>
  );
};

export default Layout;

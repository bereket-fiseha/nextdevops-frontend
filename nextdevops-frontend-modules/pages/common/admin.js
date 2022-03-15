import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import AdminHome from "../../components/Admin/adminHome";
import styles from "../../styles/Nav.module.css";

const Admin = () => {
  return (
    <div className={styles.center}>
      <AdminHome />
    </div>
  );
};

export default withAuthenticator(Admin);

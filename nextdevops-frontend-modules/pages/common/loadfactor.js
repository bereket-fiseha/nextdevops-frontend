import React, { useEffect } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import LoadFactorHome from "../../components/LoadFactor/LoadFactorHome";
import styles from "../../styles/Nav.module.css";

import { tawkToLoadScripts } from "../../components/LoadFactor/TwakIntegration";

//https://www.youtube.com/watch?v=xwORGCqollM --> tutorial for reference
const LoadFactor = () => {
  useEffect(() => {
    tawkToLoadScripts();
  }, []);
  return (
    <div className={styles.center}>
      <LoadFactorHome />
    </div>
  );
};

export default withAuthenticator(LoadFactor);

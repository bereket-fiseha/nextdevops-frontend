import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from 'react-bootstrap/Spinner';

const useStyles = makeStyles((theme) => ({
  fpContainer: {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    background: "#f8f8f8",
    zIndex: "999"
  },
  fpLoader1: {
    top: "50%",
    left: "48%",
    zIndex: "1000",
    position: "absolute",
    ["@media (max-width:780px)"]: {
      width: "1rem",
      height: "1rem",
    },
  },
  fpLoader2: {
    top: "50%",
    left: "52%",
    zIndex: "1000",
    position: "absolute",
    ["@media (max-width:780px)"]: {
      width: "1rem",
      height: "1rem",
    },
  },
  fpLoader3: {
    top: "50%",
    left: "56%",
    zIndex: "1000",
    position: "absolute",
    ["@media (max-width:780px)"]: {
      width: "1rem",
      height: "1rem",
    },
  },
}));

const FullPageLoader = () => {
  const classes = useStyles();

  return (
    <div className={classes.fpContainer}>
      <Spinner variant="success" className={classes.fpLoader1} animation="grow" />
      <Spinner variant="success" className={classes.fpLoader2} animation="grow" />
      <Spinner variant="success" className={classes.fpLoader3} animation="grow" />
      {/* <img src={Spinner} className={classes.fpLoader} alt="loading" /> */}
    </div>
  );
};

export default FullPageLoader;

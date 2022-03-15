import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem 0",
    padding: "1rem",
    ["@media (max-width:780px)"]: {
      flexDirection: "column",
      alignItems: "center"
    }
  }
});
const DisplayFilter = () => {
  const classes = useStyles();
  const [fromDate, setFromDate] = useState();
  const [tillDate, setTillDate] = useState();

  const handleFromDateChange = e => {
    console.log(e.target.value);
    setFromDate(e.target.value);
  };

  const handleTillDateChange = e => {
    setTillDate(e.target.value);
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        marginBottom: "1rem",
        padding: "0 0.5rem 0 1rem",
        // borderBottom: "4px solid gray",
        boxShadow: "0px 1px 1px gray"
      }}
    >
      <div
        style={{
          padding: "0.5rem",
          display: "flex",
          color: "white",
          backgroundColor: "#589442",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
          fontWeight: "bold",
          fontSize: "1.25rem"
        }}
      >
        Filter By Dates
      </div>
      <div className={classes.filterContainer}>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "8px", marginRight: "8px" }}>From:</div>{" "}
          <TextField
            style={{ marginLeft: "4px", marginBottom: "1rem" }}
            type="date"
            htmlType="date"
            name="expirydate"
            value={fromDate}
            onchange={handleFromDateChange}
            // error={!!isDate.no_date}
          />
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "8px", marginRight: "8px" }}>Till:</div>{" "}
          <TextField
            style={{ marginLeft: "4px", marginBottom: "1rem" }}
            type="date"
            htmlType="date"
            name="expirydate"
            value={tillDate}
            onchange={handleTillDateChange}
            // error={!!isDate.no_date}
          />
        </div>
        <Button
          style={{
            width: "6rem",
            height: "2.25rem",
            backgroundColor: "#589442"
          }}
          onClick={() => getShipperReceievedQuotes()}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default DisplayFilter;

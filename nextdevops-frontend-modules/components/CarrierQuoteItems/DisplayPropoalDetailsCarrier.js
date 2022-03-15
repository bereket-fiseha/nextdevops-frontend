import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
  container: {
    padding: 24,
  },
  subContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    padding: 0,
  },
  itemContainer: {
    flex: 1,
    flexWrap: "wrap",
    display: "flex",
    padding: 0,
  },
  subTotalContainer: {
    marginTop: 40,
    float: "right",
    width: 150,
    paddingRight: 0,
  },
  subItem: {
    padding: 0,
    margin: 0,
    marginLeft: "auto",
    marginBottom: 5,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    itemsCenter: "center",
    marginTop: 20,
  },
  button: {
    margin: "0 10px",
  },
  proposalButton: {
    margin: "20px 10px",
    display: "flex",
    justifyContent: "space-evenly",
  },
});

// clicking on each proposal display the table
const displayIndividualProposal = (
  setDisplaySentProposal,
  shipperName,
  classes,
  dataIndex,
  wholeData,
  callFromUpdateChanges,
  t
) => {
  return (
    <>
      <Paper elevation={3} className={classes.container}>
        <Container className={classes.subContainer}>
          <Container className={classes.itemContainer}>
            <Typography variant="body1" gutterBottom component="div">
              {`${t("_proposal")} ${dataIndex + 1}`}
            </Typography>
          </Container>
        </Container>
        <Container className={classes.subContainer}>
          <Container className={classes.itemContainer}>
            <Typography variant="body1" gutterBottom component="div">
              {t("shipper name")}:&nbsp;
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
              {shipperName}
            </Typography>
          </Container>
        </Container>
        <Container className={classes.subContainer}>
          <Container className={classes.itemContainer}>
            <Typography variant="body1" gutterBottom component="div">
              {t("expiry date")}:&nbsp;
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
              {wholeData[dataIndex].expiryDate}
            </Typography>
          </Container>
        </Container>
        <Container className={classes.itemContainer}>
          <Typography variant="body1" gutterBottom component="div">
            {t("proposal sent")}:&nbsp;
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
            {wholeData[dataIndex].proposalSendDate}
          </Typography>
        </Container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t("id")}</TableCell>
                <TableCell>{t("unit price")}</TableCell>
                <TableCell>{t("freight class")}</TableCell>
                <TableCell>{t("counts")}</TableCell>
                <TableCell>{t("total weight")}</TableCell>
                <TableCell>{t("width")}</TableCell>
                <TableCell>{t("height")}</TableCell>
                <TableCell>{t("length")}</TableCell>
                <TableCell>{t("tax")}</TableCell>
                <TableCell>{t("description")}</TableCell>
                <TableCell>{t("total amount")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wholeData[dataIndex].shipmentDetails?.map((row, ind) => (
                <TableRow key={row.id.toString()}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.unitPrice}</TableCell>
                  <TableCell>{row.freightClass}</TableCell>
                  <TableCell>{row.counts}</TableCell>
                  <TableCell>{row.totalWeight}</TableCell>
                  <TableCell>{row.width}</TableCell>
                  <TableCell>{row.height}</TableCell>
                  <TableCell>{row.lengthh}</TableCell>
                  <TableCell>{row.tax}</TableCell>
                  <TableCell>{row.itemDescription}</TableCell>
                  <TableCell>
                    {DisplayIndividualTotalPrice(
                      row.unitPrice,
                      row.counts,
                      row.tax
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Container className={classes.subTotalContainer}>
          <p className={classes.subItem}>
            {t("sub total")}:&nbsp; {wholeData[dataIndex].subTotal}
          </p>
          <p className={classes.subItem}>
            {t("tax")}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            {Math.round((wholeData[dataIndex].tax * 100) / 100).toFixed(2)}
          </p>
          <p className={classes.subItem}>
            {t("total")}: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {wholeData[dataIndex].totalAmt}
          </p>
          <p className={classes.subItem}>
            {t("currency")}: {wholeData[dataIndex].currency || "USD"}
          </p>
        </Container>
        {!callFromUpdateChanges && (
          <Container className={classes.buttonContainer}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => setDisplaySentProposal(false)}
            >
              {t("back")}
            </Button>
          </Container>
        )}
      </Paper>
    </>
  );
};

const DisplayIndividualTotalPrice = (unitPrice, counts, tax) => {
  return unitPrice * counts + (unitPrice * counts * tax) / 100;
};

const handleIndividualProposalDisplay = (
  setIndex,
  setDisplayProposal,
  index
) => {
  setIndex(index);
  setDisplayProposal(true);
};

export default function DisplayProposalDetailsCarrier({
  setDisplaySentProposal,
  shipperName,
  wholeData,
  callFromUpdateChanges,
}) {
  const classes = useStyles();
  const [displayProposal, setDisplayProposal] = useState(false);
  const [dataIndex, setIndex] = useState(0);
  const { t } = useTranslation();
  return (
    <>
      <div>
        <div>{t("send proposal")}</div>
        <div className={classes.proposalButton}>
          {wholeData.map((data, index) => {
            return (
              <Button
                style={{
                  backgroundColor: "green",
                  color: "white",
                  width: "7rem",
                  borderRadius: "0.25rem",
                }}
                onClick={() =>
                  handleIndividualProposalDisplay(
                    setIndex,
                    setDisplayProposal,
                    index
                  )
                }
              >{`${t("_proposal")} ${index + 1}`}</Button>
            );
          })}
        </div>
      </div>
      {displayProposal &&
        displayIndividualProposal(
          setDisplaySentProposal,
          shipperName,
          classes,
          dataIndex,
          wholeData,
          callFromUpdateChanges,
          t
        )}
    </>
  );
}

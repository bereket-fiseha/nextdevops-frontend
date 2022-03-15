import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { Typography } from "@material-ui/core";
import FullPageLoader from "../Helper/FullPageLoader";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  table: {
    minWidth: 200
  },
  container: {
    padding: 24
  },
  subContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    padding: 0
  },
  itemContainer: {
    flex: 1,
    flexWrap: "wrap",
    display: "flex",
    padding: 0
  },
  subTotalContainer: {
    marginTop: 10,
    float: "right",
    width: 150,
    paddingRight: 0
  },
  subItem: {
    padding: 0,
    margin: 0,
    marginLeft: "auto",
    marginBottom: 5
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    itemsCenter: "center",
    marginTop: 20
  },
  button: {
    margin: "0 10px"
  }
});

const data = {
  id: "7375ae95-0d03-4115-bce9-c43dd83e7095",
  version: "1630857839659",
  shipperId: "6b736fd9-7502-4a00-8e0c-bd4a12aa0146",
  expiryDate: "2021-09-12",
  proposalId: "832e3a4b-df12-4c37-8332-9d027aaf1a98",
  proposalSendDate: "2021-09-05",
  shipmentDetails: [
    {
      unitPrice: "40",
      freightClass: "500",
      counts: "4",
      totalWeight: "300",
      width: "20",
      tax: "10",
      id: "1628967155524",
      lengthh: "20",
      itemDescription: "beer",
      height: "30"
    },
    {
      unitPrice: "30",
      freightClass: "500",
      counts: "3",
      totalWeight: "400",
      width: "10",
      tax: "20",
      id: "1628967168768",
      lengthh: "20",
      itemDescription: "wine",
      height: "10"
    }
  ],
  carrierId: "c1",
  quoteId: "f202b206-d4b5-4a5c-9ff7-da02cf43a570c1",
  carrierCompName: "test comp name",
  totalAmt: "284",
  subTotal: "200",
  tax: "20",
  currency: "USD"
};

const DisplayIndividualTotalPrice = (unitPrice, counts, tax) => {
  return unitPrice * counts + (unitPrice * counts * tax) / 100;
};

export default function DisplayProposalDetails({
  proposalId,
  getProposalDetails,
  getProposalAcceptanceStatus,
  setDisplayProposalStatus,
  shipperAcceptedStatus,
  dataForNoProposalYet
}) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [data, setData] = useState(undefined);
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {
    setShowLoader(true);
    if (proposalId) {
      getProposalDetails(proposalId).then(response => {
        setData(response.data[0]);
        setShowLoader(false);
      });
    } else {
      setData(dataForNoProposalYet);
      setShowLoader(false);
    }
  }, []);
  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleProposalStatus = (
    quoteId,
    value,
    comment,
    carrierAcceptance = "",
    count = "0"
  ) => {
    setShowLoader(true);
    getProposalAcceptanceStatus(
      quoteId,
      value,
      "SHIPPER",
      comment,
      new Date().getTime().toString(),
      carrierAcceptance,
      count
    )
      .then(res => {
        if (res) {
          setDisplayProposalStatus(false);
          router.reload();
          setShowLoader(false);
        }
      })
      .catch(err => {
        alert("Please try again later");
        setShowLoader(false);
      });
  };
  return (
    <>
      {showLoader && <FullPageLoader />}
      {data !== undefined && (
        <Paper elevation={3} className={classes.container}>
          {data.carrierCompName && (
            <Container className={classes.subContainer}>
              <Container className={classes.itemContainer}>
                <Typography variant="body1" gutterBottom component="div">
                  {t("carrier name")}:&nbsp;
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  {data.carrierCompName}
                </Typography>
              </Container>
            </Container>
          )}
          {data.expiryDate && (
            <Container className={classes.subContainer}>
              <Container className={classes.itemContainer}>
                <Typography variant="body1" gutterBottom component="div">
                  {t("expiry date")}:&nbsp;
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  {data.expiryDate}
                </Typography>
              </Container>
            </Container>
          )}
          <Container className={classes.itemContainer}>
            <Typography variant="body1" gutterBottom component="div">
              {t("quote sent")}:&nbsp;
            </Typography>
            <Typography gutterBottom component="div">
              {data.qCreatedOn}
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
                {data.shipmentDetails.map(row => (
                  <TableRow key={row.id.toString()}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>
                      {row.unitPrice ? row.unitPrice : "N/A"}
                    </TableCell>
                    <TableCell>
                      {row.freightClass ? row.freightClass : "N/A"}
                    </TableCell>
                    <TableCell>{row.counts}</TableCell>
                    <TableCell>{row.totalWeight}</TableCell>
                    <TableCell>{row.width}</TableCell>
                    <TableCell>{row.height}</TableCell>
                    <TableCell>{row.lengthh}</TableCell>
                    <TableCell>{row.tax ? row.tax : "N/A"}</TableCell>
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
          {proposalId && (
            <Container className={classes.subTotalContainer}>
              <p className={classes.subItem}>
                {t("sub total")}:&nbsp; {data.subTotal}
              </p>
              <p className={classes.subItem}>
                {t("tax")}
                :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {data.tax}
              </p>
              <p className={classes.subItem}>
                {t("total")}: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {data.totalAmt}
              </p>
              <p className={classes.subItem}>
                {t("currency")}: {data.currency}
              </p>
            </Container>
          )}
          {!shipperAcceptedStatus && (
            <TextField
              id="outlined-multiline-flexible"
              label="Comments"
              multiline
              maxRows={4}
              variant="outlined"
              value={value}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          )}
          <Container className={classes.buttonContainer}>
            {!shipperAcceptedStatus && (
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() =>
                  handleProposalStatus(
                    data.quoteId,
                    "Accepted",
                    value,
                    "no response yet"
                  )
                }
              >
                {t("accept")}
              </Button>
            )}
            {!shipperAcceptedStatus && (
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={() =>
                  handleProposalStatus(data.quoteId, "Rejected", value)
                }
              >
                {t("reject")}
              </Button>
            )}
            {!shipperAcceptedStatus && (
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() =>
                  handleProposalStatus(
                    data.quoteId,
                    "Asked For Changes",
                    value,
                    "",
                    "1"
                  )
                }
              >
                {t("ask changes")}
              </Button>
            )}
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => setDisplayProposalStatus(false)}
            >
              {t("back")}
            </Button>
          </Container>
        </Paper>
      )}
    </>
  );
}

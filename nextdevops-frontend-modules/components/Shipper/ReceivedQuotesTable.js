import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DisplayProposalDetails from "./DisplayProposalDetails";
import { fetchGetJSON, fetchPostJSON } from "../../libs/api-helpers";
import getStripe from "../../libs/get-stripejs";
import router, { useRouter } from "next/router";
import { Card, CardContent, Modal } from "@material-ui/core";
import ShippingBOLForm from "../BOL";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import ChatIcon from "@mui/icons-material/Chat";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import ReactTooltip from "react-tooltip";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import axios from "axios";

//setDataIndex is for setting the proposalId for api call inside <DisplayProposalDetails />
const useRowStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
}));

const handleDisplayProposal = ({
  dataForProposal,
  proposalId,
  setDisplayProposalStatus,
  setDataIndex,
  shipperAccepted,
  setShipperAcceptedStatus,
  historyRow,
  setDisplayDataForNoProposalYet = () => {}
}) => {
  setDisplayProposalStatus(true);
  setDataIndex(proposalId);
  shipperAccepted === "Accepted" && setShipperAcceptedStatus(true);
  setDisplayDataForNoProposalYet(historyRow);
};

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useModalStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "100%",
    maxWidth: 916,
    height: "100%",
    maxHeight: 800,
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  },
  modalHeading: {
    background: "#87dd62",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    paddingLeft: 20,
    fontSize: 30
  },
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
}));

const SetupBOL = ({ isOpen, onClose }) => {
  const classes = useModalStyles();
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        style={getModalStyle()}
        className={classes.paper}
        component={Card}
        borderRadius={2}
        variant="outlined"
      >
        <Box className={classes.modalHeading} height={50} component="div">
          Bill of Lading
        </Box>
        <CardContent>
          <ShippingBOLForm />
        </CardContent>
      </Box>
    </Modal>
  );
};

const handleCarrierResponseStatus = count => {
  if (count === "1") {
    return "Awaiting Response";
  } else if (count === "2") {
    return "Proposal Updated";
  } else {
    return "Proposal Received";
  }
};

function Row(props) {
  const {
    row,
    data,
    setDisplayProposalStatus,
    dataForProposal,
    setDataIndex,
    setShipperAcceptedStatus,
    setDisplayDataForNoProposalYet
  } = props;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [showBol, setShowBol] = useState(false);
  const classes = useRowStyles();
  const router = useRouter();
  const handlePayment = async (totalAmt, proposalId, quoteId) => {
    setLoading(true);
    // Create a Checkout Session.
    const response = await fetchPostJSON("/api/checkout_sessions", {
      amount: totalAmt,
      proposalId: proposalId,
      quoteId: quoteId
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }
    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.id
    });

    console.warn(error.message);
    setLoading(false);
  };

  const handleChat = (quoteId, uname) => {
    router.push({
      pathname: "/Notes",
      query: { quoteId, uname, role: "SHIPPER" }
    });
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          style={{ display: "flex", justifyContent: "space-between" }}
          component="th"
          scope="row"
        >
          {row}
          <span>{data[0].qCreatedOn}</span>
          <span style={{ float: "right" }}>
            {data[0].proposalId
              ? `Cheapest Proposal Amount ${data[0].totalAmt}`
              : "No Proposal Yet"}
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          {/* {data[0].proposalId && ( */}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Quote Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Carrier Name</TableCell>
                    <TableCell>Recieved Date</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Carrier Response</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Proposal Status</TableCell>
                    <TableCell>BOL</TableCell>
                    <TableCell>Pay</TableCell>
                    <TableCell align="right">Chat</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((historyRow, index) => {
                    const {
                      date,
                      proposalId,
                      compName,
                      proposalSendDate,
                      expiryDate,
                      Kount,
                      totalAmt,
                      shipperAccepted,
                      bolId,
                      quoteId,
                      paymentStatus,
                      notReadShipper,
                      shipperName
                    } = historyRow;
                    return (
                      <>
                        {/* {historyRow.proposalId ? ( */}
                        <TableRow key={date}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell component="th" scope="row">
                            <span>{proposalId ? compName : "No Proposal"}</span>
                          </TableCell>
                          <TableCell>
                            <span>
                              {proposalId
                                ? moment(proposalSendDate).format("DD.MMM.YY")
                                : "N/A"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span>
                              {proposalId
                                ? moment(expiryDate).format("DD.MMM.YY")
                                : "N/A"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span>{handleCarrierResponseStatus(Kount)}</span>
                          </TableCell>
                          <TableCell>
                            <span>{proposalId ? totalAmt : "N/A"}</span>
                          </TableCell>
                          <TableCell>
                            {proposalId ? (
                              <Button
                                variant="success"
                                style={{ fontSize: "0.75rem" }}
                                onClick={() =>
                                  handleDisplayProposal({
                                    dataForProposal,
                                    proposalId,
                                    setDisplayProposalStatus,
                                    setDataIndex,
                                    shipperAccepted,
                                    setShipperAcceptedStatus
                                  })
                                }
                              >
                                {historyRow.shipperAccepted === "Accepted"
                                  ? "Accepted/View"
                                  : "View"}
                              </Button>
                            ) : (
                              <Button
                                variant="success"
                                style={{ fontSize: "0.75rem" }}
                                onClick={() =>
                                  handleDisplayProposal({
                                    dataForProposal,
                                    proposalId,
                                    setDisplayProposalStatus,
                                    setDataIndex,
                                    shipperAccepted: "Accepted",
                                    setShipperAcceptedStatus,
                                    historyRow,
                                    setDisplayDataForNoProposalYet
                                  })
                                }
                              >
                                View
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            {quoteId ? (
                              <Link
                                href={`/ShippingBolForm/${bolId ||
                                  uuidv4()}?quoteId=${quoteId}`}
                              >
                                BOL
                              </Link>
                            ) : (
                              "No Proposal Given Yet"
                            )}
                          </TableCell>
                          <TableCell>
                            {proposalId &&
                            paymentStatus !== "PAYMENT SUCCESSFUL" ? (
                              // {(historyRow.proposalId)  ? (
                              <Button
                                variant="success"
                                style={{ fontSize: "0.75rem" }}
                                onClick={() =>
                                  handlePayment(totalAmt, proposalId, quoteId)
                                }
                              >
                                Pay
                              </Button>
                            ) : (
                              <>
                                {paymentStatus == "PAYMENT SUCCESSFUL"
                                  ? "PAID"
                                  : "No Proposal Given Yet"}
                              </>
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {notReadShipper === "1" ? (
                              <span data-for="msg" data-tip="New Message">
                                <ReactTooltip id="msg" />
                                <Badge color="secondary" variant="dot">
                                  <MailIcon
                                    color="success"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      handleChat(quoteId, shipperName)
                                    }
                                  />
                                </Badge>
                              </span>
                            ) : (
                              <span data-for="chat" data-tip="Chat">
                                <ReactTooltip id="chat" />
                                <ChatIcon
                                  color="success"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    handleChat(quoteId, shipperName)
                                  }
                                />
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                        {/* ) : (
                        <div style={{ width: "100px" }}>No Proposal yet</div>
                      )} */}
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
          {/* )} */}
        </TableCell>
      </TableRow>

      <SetupBOL isOpen={showBol} onClose={() => setShowBol(false)} />
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired
  }).isRequired
};

function CollapsibleTable({
  data,
  setDisplayProposalStatus,
  dataForProposal,
  setDataIndex,
  setShipperAcceptedStatus,
  getShipperReceievedQuotes,
  propsFromDate,
  propsTillDate,
  shipperId,
  setShowLoader,
  setQuoteDetails,
  setDisplayDataForNoProposalYet
}) {
  const [fromDate, setFromDate] = useState();
  const [tillDate, setTillDate] = useState();
  const [errorTextForFromDate, setErrorTextForFromDate] = useState("");
  const [fromError, setFromError] = useState(false);
  const [errorTextForTillDate, setErrorTextForTillDate] = useState("");
  const [tillError, setTillError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const classes = useModalStyles();
  const handleFromDateChange = e => {
    setFromDate(e.target.value);
  };

  const handleFromDateError = e => {
    if (e.target.value === "") {
      setErrorTextForFromDate("Please Select From Date");
      setFromError(true);
    } else if (
      tillDate !== undefined &&
      moment(e.target.value).isBefore(moment(tillDate))
    ) {
      setTillError(false);
      setErrorTextForTillDate("");
    } else {
      setFromError(false);
      setErrorTextForFromDate("");
    }
    if (
      moment(e.target.value).isBefore(moment(moment().format("YYYY-MM-DD")))
    ) {
      setErrorTextForFromDate("");
      setFromError(false);
    }
  };

  const handleTillDateChange = e => {
    setTillDate(e.target.value);
  };

  const handleTillDateError = e => {
    if (
      moment(e.target.value).isBefore(moment(moment().format("YYYY-MM-DD")))
    ) {
      setErrorTextForTillDate("");
      setTillError(false);
    }
    if (e.target.value === "") {
      setErrorTextForTillDate("Please Select Till Date");
      setTillError(true);
    } else if (
      fromDate !== undefined &&
      moment(e.target.value).isBefore(moment(fromDate))
    ) {
      setErrorTextForTillDate("Please Select a date greated than from date");
      setTillError(true);
    } else {
      setTillError(false);
      setErrorTextForTillDate("");
    }
  };

  const handleFilterQuote = () => {
    if (fromDate === undefined) {
      setErrorTextForFromDate("Please Select From Date");
      setFromError(true);
    } else if (
      moment(fromDate).isAfter(moment(moment().format("YYYY-MM-DD")))
    ) {
      setErrorTextForFromDate("Please Select Date before today's date");
      setFromError(true);
    }
    if (tillDate === undefined) {
      setErrorTextForTillDate("Please Select Till Date");
      setTillError(true);
    } else if (
      moment(tillDate).isAfter(moment(moment().format("YYYY-MM-DD")))
    ) {
      setErrorTextForTillDate("Please Select Date before today's date");
      setTillError(true);
    }

    fromDate !== undefined &&
      tillDate !== undefined &&
      !fromError &&
      !tillError &&
      !moment(tillDate).isAfter(moment(moment().format("YYYY-MM-DD"))) &&
      !moment(fromDate).isAfter(moment(moment().format("YYYY-MM-DD"))) &&
      getShipperReceievedQuotes(shipperId, fromDate, tillDate)
        .then(res => {
          setShowLoader(false);
          setQuoteDetails(res.data);
        })
        .catch(err => {
          if (err.response.data.responseCode === "404") {
            setShowModal(true);
          }
        });
  };

  const handleModelClose = () => {
    setShowModal(false);
    router.reload();
  };
  const keys = data && data !== undefined && Object.keys(data);
  const style = {
    position: "absolute",
    padding: "3rem",
    top: "45%",
    left: "47%",
    transform: "translate(-50%, -50%)",
    width: "35rem",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white"
  };
  return (
    <div style={{ position: "relative" }}>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box style={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            No Quote Found!!!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please Search with different set of date range.
          </Typography>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={{
                backgroundColor: "green",
                color: "white",
                width: "4.25rem",
                marginTop: "1rem"
              }}
              onClick={handleModelClose}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
      <div
        style={{
          backgroundColor: "white",
          marginBottom: "1rem"
        }}
      >
        <div
          style={{
            padding: "0.5rem",
            display: "flex",
            color: "white",
            justifyContent: "center",
            backgroundColor: "#589442",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
            fontWeight: "bold"
          }}
        >
          Quotes Dashboard
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
              onChange={handleFromDateChange}
              onBlur={handleFromDateError}
              error={fromError}
              helperText={errorTextForFromDate}
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
              onChange={handleTillDateChange}
              onBlur={handleTillDateError}
              error={tillError}
              helperText={errorTextForTillDate}
            />
          </div>
          <Button
            style={{
              width: "6rem",
              height: "2.25rem",
              backgroundColor: "#589442"
            }}
            onClick={handleFilterQuote}
          >
            Submit
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#589442",
            padding: "0.5rem",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Filtered Quotes from {fromDate ? fromDate : propsFromDate} -{" "}
          {tillDate ? tillDate : propsTillDate}
        </div>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Group Quote Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {keys &&
              keys.map(row => (
                <Row
                  key={row}
                  row={row}
                  data={data[row]}
                  setDisplayProposalStatus={setDisplayProposalStatus}
                  dataForProposal={dataForProposal}
                  setDataIndex={setDataIndex}
                  setShipperAcceptedStatus={setShipperAcceptedStatus}
                  setDisplayDataForNoProposalYet={
                    setDisplayDataForNoProposalYet
                  }
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function ReceivedQuotesTable({
  data,
  getProposalDetails,
  getProposalAcceptanceStatus,
  getShipperReceievedQuotes,
  propsFromDate,
  propsTillDate,
  shipperId,
  setShowLoader,
  setQuoteDetails
}) {
  const router = useRouter();

  useEffect(() => {
    if (router.query.session_id) {
      fetchGetJSON(`/api/checkout_sessions/${router.query.session_id}`).then(
        response => {
          const urlParams = new URLSearchParams(response.success_url);
          if (urlParams.get("quoteId")) {
            axios
              .post(
                "https://mw8v924noh.execute-api.us-east-1.amazonaws.com/payment/v1/payment",
                { quoteId: urlParams.get("quoteId"), ...response }
              )
              .then(res => {
                window.location.href = `/QuotesReceivedShipper`;
              })
              .catch(err => console.log({ err }));
          }
        }
      );
    }
  }, [router.isReady]);

  const obj = {};
  const objKey = data.map(val => {
    obj[val.groupQuoteId] = [];
    return obj;
  });
  const [displayProposal, setDisplayProposalStatus] = useState(false);
  const [dataIndex, setDataIndex] = useState("");
  const [shipperAcceptedStatus, setShipperAcceptedStatus] = useState("");
  const [dataForNoProposalYet, setDisplayDataForNoProposalYet] = useState([]);
  const quoteIdKeys = objKey[0];
  data.length !== 0 &&
    data.forEach(val => {
      const {
        carrierCompName,
        proposalId,
        expiryDate,
        proposalSendDate,
        totalAmt,
        quoteId,
        kount,
        shipperName,
        notReadShipper,
        bolId,
        shipperAccepted,
        paymentStatus,
        shipmentDetails,
        qCreatedOn
      } = val;
      Object.keys(quoteIdKeys).forEach(key => {
        if (val.groupQuoteId === key) {
          quoteIdKeys[key].push({
            quoteId,
            compName: carrierCompName,
            proposalId,
            expiryDate,
            proposalSendDate,
            totalAmt,
            count: kount,
            bolId,
            shipperName,
            notReadShipper,
            shipperAccepted,
            paymentStatus,
            shipmentDetails,
            qCreatedOn
          });
        }
      });
    });

  return (
    <Fragment>
      {!displayProposal && (
        <CollapsibleTable
          data={quoteIdKeys}
          setDisplayProposalStatus={setDisplayProposalStatus}
          dataForProposal={data}
          setDataIndex={setDataIndex}
          setShipperAcceptedStatus={setShipperAcceptedStatus}
          getShipperReceievedQuotes={getShipperReceievedQuotes}
          propsFromDate={propsFromDate}
          propsTillDate={propsTillDate}
          shipperId={shipperId}
          setShowLoader={setShowLoader}
          setQuoteDetails={setQuoteDetails}
          setDisplayDataForNoProposalYet={setDisplayDataForNoProposalYet}
        />
      )}
      {displayProposal && (
        <DisplayProposalDetails
          proposalId={dataIndex}
          getProposalDetails={getProposalDetails}
          getProposalAcceptanceStatus={getProposalAcceptanceStatus}
          setDisplayProposalStatus={setDisplayProposalStatus}
          shipperAcceptedStatus={shipperAcceptedStatus}
          dataForNoProposalYet={dataForNoProposalYet}
        />
      )}
    </Fragment>
  );
}

export default ReceivedQuotesTable;

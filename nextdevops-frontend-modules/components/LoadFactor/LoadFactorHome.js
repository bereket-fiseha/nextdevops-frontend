import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import FullPageLoader from "../Helper/FullPageLoader";
import { useForm } from "react-hook-form";
import moment from "moment";
import DisplaySubmittedClaim from "./DisplaySubmiitedClaim";
import BankDocumentUpload from "./BankDocumentUpload";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  setLoadFactorUserId,
  getSingleQuoteDetails,
  postAgentClaim,
  getSubmittedClaims,
} from "../../redux/actions/loadfactorUserRegistration";
// import DragAndDrop from '../upload/referr/index.tsx';
import { connect } from "react-redux";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    padding: "100px 0",
    overflow: "auto",
    minWidth: "56.25rem",
  },
  root: {
    display: "flex",
    background: "#fff",
    boxShadow: "2px 10px 48px 7px rgba(0,0,0,0.75)",
    borderRadius: "12px",
    overflow: "hidden",
    flexWrap: "wrap",
  },
  tableRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    flexWrap: "wrap",
    width: "100%",
  },
  fieldsArea: {
    padding: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  quoteSearch: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchButton: {
    marginLeft: "20px",
    backgroundColor: "#7FDA56",
    padding: "0 30px",
    height: "54px",
  },
  allQuoteButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7FDA56",
    padding: "0 30px",
    height: "54px",
    marginTop: "10px",
  },
  allQuote: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  or: {
    position: "absolute",
    top: "0",
    left: "50%",
  },
  orWrapper: {
    position: "relative",
    margin: "10px 0 40px 0",
  },
  TextField: {
    marginTop: "10px",
  },
  panelHeader: {
    marginBottom: "10px",
    fontSize: "25px",
    fontWeight: "400",
    display: "flex",
    justifyContent: "center",
  },
  panelHeaderBankDetails: {
    marginTop: "10px",
    fontSize: "25px",
    fontWeight: "400",
    display: "flex",
    justifyContent: "center",
  },
  submitClaimDisplayButton: {
    marginTop: "10px",
    width: "150px",
    backgroundColor: "#7FDA56",
    height: "54px",
  },
  QuoteDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LoadFactorHome = (props) => {
  const classes = useStyles();
  const {t} = useTranslation();

  useEffect(() => {
    // Access the user session on the client
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log("user", user);
        localStorage.setItem("user", true);
        const loadfactorUserId = user.attributes.sub;
        const email = user.attributes.email;
        setUserDetails({
          userId: loadfactorUserId,
          contactNumber: user.attributes.phone_number,
        });
        props.setLoadFactorUserId(loadfactorUserId);
        props
          .getSubmittedClaims(loadfactorUserId)
          .then((res) => setSubmittedClaimsDetails(res));
        localStorage.setItem("loadfactorUser", true);
      })
      .catch((err) => localStorage.setItem("user", false));
  }, []);
  const { register, handleSubmit } = useForm();
  const [quoteId, setQuoteId] = useState("");
  const [userDetails, setUserDetails] = useState({
    userId: "",
    contactNumber: "",
  });
  const [quoteDetails, setQuoteDetails] = useState(undefined);
  const [displaySearch, setToggleSearchBar] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState([]);
  const [showSubmitClaimButton, setShowSubmitClaimButton] = useState(false);
  const [showSubmittedClaimTable, setShowSubmittedClaimTable] = useState(false);
  const [submittedClaimsDetails, setSubmittedClaimsDetails] =
    useState(undefined);
  const [alertMessage, setAlertMessage] = useState(
    "You have successfully Submitted"
  );
  // const [loader, showLoader, hideLoader] = useFullPageLoader();
  const checkIfClaimAlreadyExist = () =>
    submittedClaimsDetails.map((claims) => claims.quoteId === quoteId);
  const handleSingleQuoteSearch = () => {
    if (quoteId !== "") {
      if (!checkIfClaimAlreadyExist()[0]) {
        setShowSubmittedClaimTable(false);
        props
          .getSingleQuoteDetails(quoteId, setShowLoader)
          .then((res) => setQuoteDetails(res));
        setToggleSearchBar(false);
      } else {
        showAlert(true);
        handleAllSubmittedClaims(true);
      }
    } else {
      // error handling condition
    }
  };

  const showAlert = (status) => {
    if (status) {
      handleSnackClick();
      setAlertMessage(
        "Claim already exist!!! Redirecting you to the existing claims details"
      );
    } else {
      // setRegistrationError(true);
    }
  };
  const handleAllSubmittedClaims = () => {
    props.getSubmittedClaims(userDetails.userId).then((res) => {
      if (res) {
        setSubmittedClaimsDetails(res);
        setShowSubmittedClaimTable(true);
        setToggleSearchBar(false);
      }
    });
  };

  const handleSnackClick = () => {
    setSnackBarOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  const checkPostAgentClaim = (status) => {
    if (status) {
      handleSnackClick();
      setShowSubmittedClaimTable(true);
    } else {
      // setRegistrationError(true);
    }
  };
  const onSubmit = (data) => {
    setOpen(true);
    const claimDetails = JSON.stringify({
      bankDetails: { ...data },
      invoice: uploadedFileName,
      quoteId,
      ...userDetails,
      claimSubmissionDate: moment().format("YYYY-MM-DD"),
    });
    props.postAgentClaim(
      JSON.parse(claimDetails),
      checkPostAgentClaim,
      setShowLoader
    );
  };
  return (
    <>
      {showLoader && <FullPageLoader />}
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
      {displaySearch && (
        <>
          <div className={classes.root}>
            <div className={classes.fieldsArea}>
              <div className={classes.field}>
                <label>{t("specific qoute")}</label>
                <span className={classes.quoteSearch}>
                  <TextField
                    className={classes.TextField}
                    label={t("enter qoute id")}
                    type="string"
                    name="quoteId"
                    variant="outlined"
                    margin="normal"
                    value={quoteId}
                    onChange={(e) => setQuoteId(e.target.value)}
                    required
                    fullWidth
                  />
                  <Button
                    className={classes.searchButton}
                    onClick={handleSingleQuoteSearch}
                  >
                    {t("search")}
                  </Button>
                </span>
              </div>
              <div className={classes.orWrapper}>
                <span className={classes.or}>OR</span>
              </div>
              <div className={classes.allQuote}>
                <div>{t("fetch all your claims")}</div>
                <Button
                  onClick={() => handleAllSubmittedClaims()}
                  className={classes.allQuoteButton}
                >
                  {t("search")}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      {showSubmittedClaimTable && !displaySearch && (
        <>
          <div className={classes.rootContainer}>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className={classes.tableRoot}>
                    <div className={classes.QuoteDetailsContainer}>
                      <DisplaySubmittedClaim
                        submittedClaimsDetails={submittedClaimsDetails}
                        setToggleSearchBar={setToggleSearchBar}
                        setQuoteId={setQuoteId}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!showLoader && !displaySearch && !showSubmittedClaimTable && (
        <div className={classes.rootContainer}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className={classes.tableRoot}>
                  {!showSubmitClaimButton && (
                    <>
                      {quoteDetails !== undefined && (
                        <div className={classes.panelHeader}>{t("qoute details")}</div>
                      )}

                      <div className={classes.QuoteDetailsContainer}>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>{t("carrier name")}</TableCell>
                                <TableCell align="right">
                                  {t("total amount")}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {quoteDetails && quoteDetails.carrierCompName}
                                </TableCell>
                                <TableCell align="right">
                                  {quoteDetails && quoteDetails.totalAmt}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          {/* <DragAndDrop /> */}
                        </TableContainer>
                        <div className="row w-100">
                          <button
                            onClick={() => setShowSubmitClaimButton(true)}
                            className="primary-submit-button-small"
                          >
                            {t("submit claim")}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  {showSubmitClaimButton && (
                    <BankDocumentUpload
                      handleSubmit={handleSubmit}
                      onSubmit={onSubmit}
                      bankDetailsClass={classes.panelHeaderBankDetails}
                      fieldAreaClass={classes.fieldAreaClass}
                      setUploadedFileName={setUploadedFileName}
                      uploadedFileName={uploadedFileName}
                      register={register}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    shipperDetails: state.shipperDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoadFactorUserId: (loadfactorUserId) =>
      setLoadFactorUserId(dispatch, loadfactorUserId),
    getSingleQuoteDetails: (quoteId, setShowLoader) =>
      getSingleQuoteDetails(dispatch, quoteId, setShowLoader),
    postAgentClaim: (data, checkPostAgentClaim, setShowLoader) =>
      postAgentClaim(dispatch, data, checkPostAgentClaim, setShowLoader),
    getSubmittedClaims: (loadfactorUserId) =>
      getSubmittedClaims(dispatch, loadfactorUserId),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadFactorHome);

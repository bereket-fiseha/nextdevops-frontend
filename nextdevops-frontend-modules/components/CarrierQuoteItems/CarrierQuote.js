import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import moment from "moment";
import Modal from "../Modal/Index";
import { makeStyles } from "@material-ui/core/styles";
import QuotesItems from "./QuoteItems";
import QuoteTable from "./QuoteTable";
import Button from "react-bootstrap/Button";
import style from "../../styles/Carrier.module.css";
import FullPageLoader from "../Helper/FullPageLoader";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { TextField } from "@material-ui/core";
import Input from "../BOL/Input";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles(theme => ({
  root: {
    // display: "flex",
    background: "#fff",
    boxShadow: "2px 10px 30px 7px rgba(0,0,0,0.75)",
    borderRadius: "12px",
    overflow: "hidden",
    // flexWrap: "wrap",
    marginTop: "10px",
    marginLeft: "15px",
    marginRight: "15px",
    marginBottom: "10px"
  },
  rootContainer: {
    padding: "100px 0",
    overflow: "auto"
    // minWidth: "56.25rem",
  },
  panelHeader: {
    background: "#589442",
    height: "50px",
    padding: "10px",
    paddingLeft: "30px",
    width: "100%",
    "& h2": {
      color: "#fff",
      fontSize: "24px"
    }
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    padding: "1rem"
  }
}));

const CustomTextField = ({ label, defaultValue = "", fullWidth = false }) => (
  <div className="flex-column d-flex">
    <span>{label}</span>
    <InputBase
      id="outlined-helperText"
      label={label}
      defaultValue={defaultValue}
      disabled
      fullWidth={fullWidth}
      // variant="outlined"
      style={{ margin: "5px" }}
    />
  </div>
);

const CarrierQuote = ({ props }) => {
  const router = useRouter();
  const classes = useStyles();
  const { t } = useTranslation();

  const [items, setItems] = useState({ items: {} });
  const saveItems = item => {
    if (!item.id) {
      item.id = new Date().getTime().toString();
    }
    setItems(prevState => {
      let items = prevState.items;
      items[item.id] = item;
      return { items };
    });
  };
  const [quoteDetails, setQuoteDetails] = useState([]);
  const [displaySendQuoteTable, setDisplaySendQuoteTable] = useState(false);
  const [quoteTableData, setQuoteTableData] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [isDate, setDate] = useState({});

  useEffect(async () => {
    const carrierDetails = localStorage.getItem("carrierDetails");
    if (carrierDetails) {
      props.setCarrierDetailsFromLocalStorage(JSON.parse(carrierDetails));
      await props.setCarrierId(JSON.parse(carrierDetails).carrierId);
    }
    if (quoteDetails.length === 0) {
      props
        .getReceievedQuotes(JSON.parse(carrierDetails).carrierId)
        .then(res => {
          // if (res.includes(500)) {
          //   alert("Sorry, No Quotes Recieved yet!!!");
          //   router.push("/Dashboard");
          // } else {
          setQuoteDetails(res.data);
          setDisplayModal(true);
          // }
        });
    }
  }, []);

  // on resent requent, we need to display the quotes sent table again
  const handleQuote = (quoteId, proposalId, displayEditTable = false) => {
    const quoteTable = quoteDetails.filter(ele => ele.quoteId === quoteId);
    setQuoteTableData(quoteTable);
    !proposalId || displayEditTable
      ? setDisplaySendQuoteTable(true)
      : setDisplaySendQuoteTable(false);
  };

  const { register, handleSubmit } = useForm();
  const [expiryDate, setExpiryDate] = useState();
  const [finalData, setFinalData] = useState({});
  const [total, setTotal] = useState(0);
  const [displaySentProposal, setDisplaySentProposal] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [callFromUpdateChanges, setCallFromUpdateChanges] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const {
    carrierDetails: {
      carrierInfo: { carrierCompName }
    }
  } = props;
  const onSubmit = data => {
    const err = {};
    if (!expiryDate) {
      err.no_date = true;
    }
    if (Object.keys(err).length > 0) {
      setDate({ ...err });
      return false;
    }
    setShowLoader(true);
    const { shipperId, carrierId, quoteId, kount } = quoteTableData[0];
    const dataToBeSend = {
      id: uuidv4(),
      expiryDate,
      proposalSendDate: moment().format("YYYY-MM-DD"),
      shipperId,
      carrierId,
      quoteId,
      proposalId: uuidv4(),
      version: new Date().getTime().toString(),
      shipmentDetails: finalData,
      totalAmt: total.toString(),
      subTotal: subTotal.toString(),
      tax: (total - subTotal).toString(),
      carrierCompName,
      Kount: kount === "1" ? "2" : kount
    };
    props
      .carrierQuotesAction(JSON.parse(JSON.stringify(dataToBeSend)))
      .then(response => {
        if (response.status === 200) {
          setShowLoader(false);
          router.reload();
        }
      })
      .catch(err => {
        alert("Quote could not been send, please try again");
        setShowLoader(false);
        router.reload();
      });
  };
  const [selectedValue, setSelectedValue] = useState([]);

  const multiSelectHandle = e => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
  };

  const handleChange = e => {
    setExpiryDate(e.target.value);
    if (e.target.value) {
      setDate({ no_date: false });
    }
  };

  // for different scenrio calls displaying of back button handle
  const handleBackButton = () => {
    if (callFromUpdateChanges) {
      setDisplaySendQuoteTable(false);
      setDisplaySentProposal(false);
    }
    setDisplaySendQuoteTable(false);
  };

  const handleModalClose = () => {
    setShowModal(!showModal);
    router.push("/Dashboard");
  };
  const displayForm = () => {
    const todayDate = moment().format("YYYY-MM-DD");
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
              <div className={classes.panelHeader}>
                <h2>{t("qoutes")}</h2>
              </div>

              <div className="p-4">
                {/* <span className={`m-4 ${style.address_header}`}>
                {t("carrier qoutes")}
              </span> */}
                <div className={`${classes.container}`}>
                  <CustomTextField
                    label={t("customer")}
                    defaultValue={quoteTableData[0].shipperId}
                  />
                  <CustomTextField label={t("date")} defaultValue={todayDate} />
                  <CustomTextField
                    label={t("qoute number")}
                    defaultValue={quoteTableData[0].quoteId}
                  />
                  <CustomTextField
                    label={t("reference")}
                    defaultValue={uuidv4()}
                  />
                  <Input
                    htmlType="date"
                    label={t("expiry date")}
                    name="expirydate"
                    value={expiryDate}
                    onchange={handleChange}
                    error={!!isDate.no_date}
                  />
                  {quoteTableData[0].comment && (
                    <div>
                      <span>{t("customer by shipper")}</span>
                      <span>{quoteTableData[0].comment}</span>
                    </div>
                  )}
                </div>
                <div>
                  <QuotesItems
                    saveItems={saveItems}
                    data={quoteTableData[0].shipmentDetails}
                    paymentTerm={quoteTableData[0].largeShipperPaymentTerm}
                    setFinalData={setFinalData}
                    setTotal={setTotal}
                    setSubTotal={setSubTotal}
                  />
                </div>

                <div className="row w-100">
                  <Button
                    variant="success"
                    type="submit"
                    className="primary-submit-button"
                  >
                    {t("submit")}
                  </Button>
                  <Button
                    className="primary-submit-button"
                    onClick={() => handleBackButton()}
                  >
                    {t("back")}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {showLoader && <FullPageLoader />}
      <div className={classes.rootContainer}>
        <div className="row">
          <div className="col-md-12">
            <div className={style.available_quotes}>
              <div style={{ overflow: "auto" }}>
                {quoteDetails.length !== 0 && (
                  <QuoteTable
                    quoteDetails={quoteDetails}
                    handleQuote={handleQuote}
                    getProposalDetails={props.getProposalDetails}
                    getDriverDetails={props.getDriverDetails}
                    assignDriverForQuote={props.assignDriverForQuote}
                    displaySentProposal={displaySentProposal}
                    setDisplaySentProposal={setDisplaySentProposal}
                    displayForm={displayForm}
                    displaySendQuoteTable={displaySendQuoteTable}
                    callFromUpdateChanges={callFromUpdateChanges}
                    setCallFromUpdateChanges={setCallFromUpdateChanges}
                  />
                )}
                {quoteDetails.length === 0 && displayModal && (
                  <Modal
                    show={showModal}
                    title="No Quote Recieved Yet"
                    handleClose={handleModalClose}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarrierQuote;

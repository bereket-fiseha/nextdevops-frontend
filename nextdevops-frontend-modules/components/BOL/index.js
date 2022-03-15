import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
  Button,
  Modal
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { SignatureBox } from "./SignatureBox";
import { ShipmentInfo } from "./ShipmentInfo";
import { ChargesBill } from "./ChargesBill";
import { CarrierDetails } from "./CarrierDetails";
import { ConsigneeDetails } from "./ConsigneeDetails";
import { ShipperDetails } from "./ShipperDetails";
import { PayerDetails } from "./PayerDetails";
import { withStyles } from "@material-ui/styles";
import TermsConditions from "./TerrmConditions";
import axios from "axios";
import router from "next/router";
import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
import FormBol from "./Bol_Form";
import { fetchPostJSON } from "../../libs/api-helpers";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Alert, AlertTitle } from "@mui/material";

const useStyles = makeStyles(theme => ({
  btnClass: {
    backgroundColor: "#efefef",
    textTransform: "capitalize",
    borderRadius: "0",
    fontWeight: "bold",
    fontSize: "14px",
    border: "0",
    padding: "0.65rem 2rem",
    "&:hover": {
      backgroundColor: "#cbefa5"
    },
    ["@media (max-width:780px)"]: {
      fontSize: "9px"
    }
  },
  table: {
    minWidth: 700
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: 40,
    marginTop: 20,
    marginBottom: 20,
    ["@media (max-width:780px)"]: {
      gridTemplateColumns: "auto"
    }
  },
  signatureBox: {
    border: "1px solid rgb(153, 153, 153)"
  },
  image: {
    ["@media (max-width:780px)"]: {
      height: "100px"
    }
  },
  innerBox: {
    width: "50%",
    display: "flex",
    justifyContent: "space-evenly",
    ["@media (max-width:780px)"]: {
      width: "100%"
    }
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "rgb(237, 247, 237)", //theme.palette.background.paper,
    // border: '2px solid #000',
    // borderRadius: '1rem',
    height: "18%",
    boxShadow: theme.shadows[5]
    // padding: theme.spacing(1),
  }
}));

const AcceptTermsCheckbox = withStyles({
  root: {
    color: "#87dd62",
    "&$checked": {
      color: "#87dd62"
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const ShippingBOLForm = ({ quoteId, bolId }) => {
  const classes = useStyles();
  const signaturePadRef = useRef({});
  const [selectedSignature, setSelectedSignature] = useState("");
  const [signatureValue, setSignatureValue] = useState("");
  const [selectedSignatureFont, setSelectedSignatureFont] = useState("");
  const [termsModalOpen, termsModalClose] = useState(false);
  const [termsCheckbox, setTermsCheckbox] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [shipperDetails, setShipperDetails] = useState({});
  const [carrierDetails, setCarrierDetails] = useState({});
  const [tableData, setTableData] = useState([]);
  const [sign, setSign] = useState("");
  const userDetails = useSelector(state => state.shipperDetails);
  const [hide, setHide] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSuccess, setSuccess] = useState(false);
  const [sumUpField, setSumpField] = useState({});
  const { t } = useTranslation();

  const initialLoad = () => {
    axios
      .get(
        `https://y342xfhpe2.execute-api.us-east-1.amazonaws.com/devload/v1/quote?quoteId=${quoteId}`
      )
      .then(res => {
        axios
          .get(
            `https://f68ep9dwo1.execute-api.us-east-1.amazonaws.com/proposal/v1/proposal?proposalId=${res.data.proposalId}`
          )
          .then(res => {
            if (res?.data[0]) {
              setTableData(
                res?.data[0].shipmentDetails.map(val => ({
                  ...val,
                  edit: false
                }))
              );
            } else {
              setTableData(
                res?.data?.shipmentDetails.map(val => ({
                  ...val,
                  edit: false
                }))
              );
            }
            setSumpField({
              subTotal: res.data[0].subTotal,
              totalAmt: res.data[0].totalAmt,
              tax: res.data[0].tax
            });
          })
          .catch(err => console.log({ err }));
      })
      .catch(err => console.log({ err }));

    axios
      .get(
        `https://v8q7uhdqmd.execute-api.us-east-1.amazonaws.com/bol/v1/bol?bolId=${bolId}`
      )
      .then(res => {
        setCarrierDetails({
          carrier_date: moment().format("YYYY-MM-DD"),
          curr_date: moment().format("YYYY-MM-DD"),
          ...carrierDetails,
          ...res?.data?.carrierData
        });
        setShipperDetails({
          curr_date: moment().format("YYYY-MM-DD"),
          ...shipperDetails,
          ...res?.data?.shipperData
        });
      })
      .catch(err => console.log({ err }));
  };
  useEffect(() => {
    initialLoad();
  }, []);

  useEffect(() => {
    const { shipperInfo = {} } = userDetails;
    setSignatureValue(shipperInfo?.firstName);
    const sd = localStorage.getItem("shipperDetails");
    const cd = localStorage.getItem("carrierDetails");
    if (sd) {
      setLoggedInUser(JSON.parse(sd));
      setShipperDetails(JSON.parse(sd));
    } else {
      setLoggedInUser(JSON.parse(cd));
      setCarrierDetails({ ...JSON.parse(cd), ...carrierDetails });
    }
  }, []);

  const handlerChangeSignatureValue = ev => {
    setSignatureValue(ev?.target?.value);
  };

  const handleSelectSignature = (signature, selectedFont) => {
    setSelectedSignature(signature);
    setSelectedSignatureFont(selectedFont);
  };

  const updateTableHandler = data => {
    setTableData(data);
  };

  const handleChange = e => {
    if (e.target.value) {
      setErrors({ ...errors, [e.target.name]: false });
    }
    if (loggedInUser.shipperId)
      setShipperDetails({ ...shipperDetails, [e.target.name]: e.target.value });
    else {
      setCarrierDetails({ ...carrierDetails, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      let error = {};
      if (loggedInUser?.shipperId) {
        if (!shipperDetails.shipper_from) {
          error.shipper_from = true;
        }
        if (!shipperDetails.shipper_firstName) {
          error.shipper_firstName = true;
        }
        if (!shipperDetails.shipper_address1) {
          error.shipper_address1 = true;
        }
        if (!shipperDetails.bill_to) {
          error.bill_to = true;
        }
        if (!shipperDetails.bill_address1) {
          error.bill_address1 = true;
        }
        if (!shipperDetails.consignee) {
          error.consignee = true;
        }
        if (!shipperDetails.consignee_firstName) {
          error.consignee_firstName = true;
        }
        if (!shipperDetails.consignee_address1) {
          error.consignee_address1 = true;
        }
        if (!shipperDetails.consignee_vehicleNumber) {
          error.consignee_vehicleNumber = true;
        }
        if (!shipperDetails.consignee_route) {
          error.consignee_route = true;
        }
      } else if (!loggedInUser?.shipperId) {
        if (!carrierDetails.carrier_date) {
          error.carrier_date = true;
        }
        if (!carrierDetails.firstName) {
          error.firstName = true;
        }
        if (!carrierDetails.carrier_shippingId) {
          error.carrier_shippingId = true;
        }
        if (!carrierDetails.carrier_frieghtBill) {
          error.carrier_frieghtBill = true;
        }
        if (!carrierDetails.address1) {
          error.address1 = true;
        }
      }
      console.log(
        "🚀 ~ file: index.js ~ line 257 ~ handleSubmit ~ error",
        error
      );

      if (Object.keys(error).length) {
        setErrors({ ...error });
        return false;
      }
      var canvas = document.getElementById("txt_signature");

      canvas = canvas ? await html2canvas(canvas) : null;
      canvas = canvas?.toDataURL("image/png");

      const canvasSignature = signaturePadRef?.current
        ?.getTrimmedCanvas()
        ?.toDataURL("image/png");
      const body = {
        bolId: bolId,
        shipperData: {
          ...shipperDetails,
          ...(loggedInUser.shipperId && {
            signature: selectedSignatureFont ? canvas : canvasSignature
          })
        },
        carrierData: {
          ...carrierDetails,
          ...(!loggedInUser.shipperId && {
            signature: selectedSignatureFont ? canvas : canvasSignature
          })
        },
        signature: signatureValue ? canvas : canvasSignature,
        signatureValue: "",
        shipperSigned: "yes",
        carrierSigned: "yes",
        selectedSignature,
        quoteId: quoteId,
        signatureDate: loggedInUser.shipperId
          ? shipperDetails.curr_date
          : carrierDetails.curr_date
      };

      axios
        .post(
          "https://v8q7uhdqmd.execute-api.us-east-1.amazonaws.com/bol/v1/bol",
          body
        )
        .then(_rs => {
          initialLoad();
          setSuccess(true);
        })
        .catch(err => {
          console.log("error from submit form request", err);
        });
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js ~ line 305 ~ handleSubmit ~ error",
        error
      );
    }
  };

  const downloadPdfDocument = async () => {
    await setHide(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const htmlString = document.getElementById("loadhitch-bol-form");
    const response = await fetchPostJSON("/api/bol/generatePDF", {
      htmlString: htmlString.outerHTML
    });

    setHide(false);
    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }
    const downloadLink = document.createElement("a");
    const fileName = "bol_form.pdf";
    const linkSource = `${response.pdf}`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
    setSuccess(false);
    setTimeout(() => {
      router.back();
    }, 1000);
  };

  const BolForm = () => (
    <div id="bol_form">
      <h2
        style={{
          textAlign: "center",
          background: "#589442",
          fontWeight: "bold",
          border: "1px solid white",
          borderRadius: "5px",
          padding: "10px"
        }}
      >
        {loggedInUser?.shipperId && !hide
          ? `${t("bill lading")}`
          : `${t("bill lading")}`}
      </h2>
      <>
        {hide && (
          <FormBol
            carrierDetails={carrierDetails}
            shipperDetails={shipperDetails}
            gridData={tableData}
            isShipper={loggedInUser?.shipperId}
            sumUpField={sumUpField}
          />
        )}
        <Box mt={2} className={classes.container}>
          <CarrierDetails
            values={carrierDetails}
            disabled={Boolean(loggedInUser?.shipperId)}
            handleChange={handleChange}
            errors={errors}
          />
          <ConsigneeDetails
            values={shipperDetails}
            disabled={!Boolean(loggedInUser?.shipperId)}
            handleChange={handleChange}
            errors={errors}
          />
          <ShipperDetails
            disabled={!Boolean(loggedInUser?.shipperId)}
            values={shipperDetails}
            handleChange={handleChange}
            errors={errors}
          />
          <PayerDetails
            disabled={!Boolean(loggedInUser?.shipperId)}
            values={shipperDetails}
            handleChange={handleChange}
            errors={errors}
          />
          {Object.keys(loggedInUser).length && (
            <ChargesBill
              isShipper={loggedInUser?.shipperId ? "Shipper" : "Consignee"}
              values={loggedInUser?.shipperId ? shipperDetails : carrierDetails}
              handleChange={handleChange}
              errors={errors}
              disabled={!Boolean(loggedInUser?.shipperId)}
            />
          )}
          <Box>
            <h6>{t("other notes")}</h6>
            <TextField fullWidth multiline rows={4} variant="outlined" />
          </Box>
        </Box>
        <Box>
          <ShipmentInfo
            tableData={tableData}
            updateTableData={updateTableHandler}
          />
        </Box>
        <Box mt={2} className={classes.container}>
          <div style={{ maxWidth: 300 }}>
            <Box>
              {shipperDetails?.signature && (
                <img
                  style={{ maxWidth: 500 }}
                  className={classes.image}
                  src={shipperDetails?.signature}
                  alt="signature"
                />
              )}
            </Box>
            {loggedInUser?.shipperId && (
              <SignatureBox
                title={t("shippers signature")}
                onSelectSignature={handleSelectSignature}
                selectedSignatureFont={selectedSignatureFont}
                signatureValue={signatureValue}
                selectedSignature={selectedSignature}
                ref={signaturePadRef}
                onChangeValue={handlerChangeSignatureValue}
                handleChange={handleChange}
                values={shipperDetails}
                setSign={setSign}
                tooltip={t("shipper signature tooltip")}
              />
            )}
          </div>
          <div style={{ maxWidth: 300, margin: "0 auto" }}>
            <Box>
              {carrierDetails?.signature && (
                <img
                  style={{ maxWidth: 500 }}
                  className={classes.image}
                  src={carrierDetails?.signature}
                  alt="signature"
                />
              )}
            </Box>
            {!loggedInUser?.shipperId && (
              <SignatureBox
                title={t("carrier signature")}
                onSelectSignature={handleSelectSignature}
                selectedSignatureFont={selectedSignatureFont}
                ref={signaturePadRef}
                signatureValue={signatureValue}
                selectedSignature={selectedSignature}
                values={carrierDetails}
                setSign={setSign}
                handleChange={handleChange}
                onChangeValue={handlerChangeSignatureValue}
                tooltip={t("carrier signature tooltip")}
              />
            )}
          </div>
        </Box>
      </>
      {loggedInUser?.shipperId && (
        <FormControlLabel
          control={
            <AcceptTermsCheckbox
              checked={termsCheckbox}
              onChange={() => {
                if (termsCheckbox) {
                  setTermsCheckbox(false);
                } else {
                  termsModalClose(true);
                }
              }}
              name="term and conditions"
            />
          }
          label={`${t("agree term & conditions")} ${carrierDetails?.firstName ||
            ""}`}
        />
      )}

      <TermsConditions
        isOpen={termsModalOpen}
        onClose={() => {
          termsModalClose(!termsModalOpen);
        }}
        accept={() => {
          setTermsCheckbox(true);
          termsModalClose(false);
        }}
        carrierName={carrierDetails?.firstName || ""}
      />
    </div>
  );

  const handleClose = () => {
    setSuccess(false);
    router.back();
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

  return (
    <>
      <Modal open={isSuccess} style={getModalStyle()} className={classes.paper}>
        <Alert style={{ height: "100%", justifyContent: "center" }}>
          <AlertTitle>BOL Saved Successfully</AlertTitle>
          <Button onClick={handleClose}>{t("back")}</Button>
          <Button className={classes.btnClass} onClick={downloadPdfDocument}>
            {t("Download Form")}
          </Button>
        </Alert>
      </Modal>
      {BolForm()}
      <Box
        mt={2}
        display="flex"
        justifyContent="center"
        // className={classes.innerBox}
      >
        <Button style={{ marginRight: "0.5rem" }} onClick={handleClose}>
          {t("back")}
        </Button>

        <Button
          className={classes.btnClass}
          disabled={loggedInUser?.shipperId && !termsCheckbox}
          onClick={handleSubmit}
        >
          {t("submit")}
        </Button>
      </Box>
    </>
  );
};

export default ShippingBOLForm;

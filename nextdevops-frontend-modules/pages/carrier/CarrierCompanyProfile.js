import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  setCarrierId,
  setCarrierDetailsFromLocalStorage,
} from "../../redux/actions/carrierRegistration";
import { makeStyles, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import FullPageLoader from "../../components/Helper/FullPageLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    background: "#fff",
    boxShadow: "2px 10px 48px 7px rgba(0,0,0,0.75)",
    borderRadius: "12px",
    overflow: "hidden",
    flexWrap: "wrap",
    marginTop: "80px",
    marginBottom: "10px",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    padding: "1rem",
    gridGap: 10,
  },
  panelHeader: {
    background: "#589442",
    height: "50px",
    padding: "10px",
    paddingLeft: "30px",
    width: "100%",
    "& h2": {
      color: "#fff",
      fontSize: "24px",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  textFieldMargin: {
    marginLeft: "20px",
  },
}));

const CustomTextField = ({ label, value = "", fullWidth = true }) => (
  <TextField
    id="outlined-helperText"
    label={label}
    defaultValue={value}
    variant="outlined"
    disabled
    fullWidth={fullWidth}
    style={{ margin: "2px" }}
  />
);

const CompanyProfile = ({
  carrierDetails,
  setCarrierId,
  setCarrierDetailsFromLocalStorage,
}) => {
  const [carrier, setCarrier] = useState(carrierDetails);
  const [showLoader, setShowLoader] = useState(true);
  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(async () => {
    const carrierDetail = JSON.parse(localStorage.getItem("carrierDetails"));
    if (carrierDetail) {
      setCarrier(carrierDetail);
      await setCarrierDetailsFromLocalStorage(carrierDetail);
      await setCarrierId(carrierDetail.carrierId);
    } else {
      setCarrier(carrierDetails);
    }
    setShowLoader(false);
  }, []);

  const {
    firstName,
    lastName,
    city,
    state,
    address1,
    address2,
    email,
    phone,
    carrierCompName,
    zip,
    CVORNumber,
    MCNumber,
    carrierOperation,
    carrierOperationDestination,
    dotNumber,
    registeredSaleTax,
  } = carrier;

  return (
    <>
      {showLoader && <FullPageLoader />}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={classes.root}>
              <div className={classes.panelHeader}>
                <h2>{t("carrier profile")}</h2>
              </div>
              {firstName !== "" && (
                <div className={classes.container}>
                  <CustomTextField
                    label={t("firstName")}
                    value={firstName}
                    fullWidth={false}
                  />
                  <CustomTextField
                    label={t("lastName")}
                    value={lastName}
                    fullWidth={false}
                  />
                  <CustomTextField
                    label={t("companyName")}
                    value={carrierCompName}
                    fullWidth={false}
                  />
                  <CustomTextField
                    label={t("companyAddress")}
                    value={address1}
                    fullWidth={false}
                  />
                  <CustomTextField label={t("email")} value={email} />
                  <CustomTextField label={t("phone")} value={phone} />
                  {address2 !== "" && (
                    <CustomTextField
                      label={t("homeAddress")}
                      value={address2}
                    />
                  )}
                  <CustomTextField
                    label={t("city")}
                    value={city}
                    fullWidth={false}
                  />
                  <CustomTextField
                    label={t("state")}
                    value={state}
                    fullWidth={false}
                  />
                  <CustomTextField
                    label={t("zipCode")}
                    value={zip}
                    fullWidth={false}
                  />
                  <CustomTextField
                    label={t("dotNumber")}
                    value={dotNumber}
                    fullWidth={false}
                  />
                  <CustomTextField
                    label={t("cvor number")}
                    value={CVORNumber}
                    fullWidth={false}
                  />
                  <CustomTextField
                    label={t("mc number")}
                    value={MCNumber}
                    fullWidth={false}
                  />
                  <CustomTextField
                    label={t("carrier operation")}
                    value={carrierOperation}
                    fullWidth={false}
                  />
                  <CustomTextField
                    label={t("carrier destination")}
                    value={carrierOperationDestination}
                    fullWidth={false}
                  />
                  <CustomTextField
                    label={t("sales tax")}
                    value={registeredSaleTax}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    carrierDetails: state.carrierDetails.carrierInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCarrierId: (carrierId) => setCarrierId(dispatch, carrierId),
    setCarrierDetailsFromLocalStorage: (carrierDetails) =>
      setCarrierDetailsFromLocalStorage(dispatch, carrierDetails),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);

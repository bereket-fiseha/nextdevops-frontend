import React, { useEffect, useState } from "react";
import {
  setShipperDetailsFromLocalStorage,
  setShipperId,
  setShipperDetails,
} from "../../redux/actions/shipperRegistration";
import EditableCompanyProfile from "../../components/Shipper/EditableCompanyProfile";
import Snackbar from "@material-ui/core/Snackbar";
import { Button, TextField, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import FullPageLoader from "../../components/Helper/FullPageLoader";

const useStyles = makeStyles((theme) => ({
  saveButton: {
    // color: "black",
    backgroundColor: "greenyellow",
    marginLeft: "10px",
    fontSize: "12px",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  root: {
    // display: "flex",
    background: "#fff",
    boxShadow: "2px 10px 48px 7px rgba(0,0,0,0.75)",
    borderRadius: "12px",
    overflow: "hidden",
    // flexWrap: "wrap",
    marginTop: "80px",
    marginBottom: "10px",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    padding: "1rem",
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
  addButton: {
    background: "#589442",
    color: "white",
    marginRight: 20,
    "&:hover": {
      background: "#589442",
      color: "white",
      marginRight: 20,
    },
  },
  bttonGroup: {
    // width: "40%",
    // display: "flex",
    // justifyContent: "space-evenly",
    padding: "10px",
    margin: 20,
  },
}));

const CustomTextField = ({
  label,
  value = "",
  fullWidth = false,
  errors = {},
  name = "",
}) => (
  <TextField
    id="outlined-helperText"
    label={label}
    defaultValue={value}
    disabled
    fullWidth={fullWidth}
    variant="outlined"
    style={{ margin: "5px" }}
    error={!!errors[name]}
    helperText={errors[name] && "Required"}
  />
);

const CompanyProfile = ({
  shipperDetails,
  setShipperDetailsFromLocalStorage,
  setShipperId,
  setShipperDetails,
}) => {
  const {
    firstName,
    lastName,
    city,
    state,
    address1,
    address2,
    email,
    phone,
    shipperCompName,
    zip,
    shipperId,
  } = shipperDetails;
  useEffect(async () => {
    const shipperDetails = localStorage.getItem("shipperDetails");
    if (shipperDetails) {
      await setShipperDetailsFromLocalStorage(JSON.parse(shipperDetails));
      setShipperId(shipperDetails.shipperId);
    }
  }, []);

  const classes = useStyles();

  const [, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [, setRegistrationError] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editFName, setEditFName] = useState(firstName);
  const [editLName, setEditLName] = useState(lastName);
  const [editCity, setEditCity] = useState(city);
  const [editState, setEditState] = useState(state);
  const [editAddress1, setEditAddress1] = useState(address1);
  const [editAddress2, setEditAddress2] = useState(address2);
  const [editShipperCompName, setEditShipperCompName] =
    useState(shipperCompName);
  const [editZip, setEditZip] = useState(zip);
  const [errors, setErrors] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const objToBePassed = {
    setEditFName,
    setEditLName,
    setEditShipperCompName,
    setEditState,
    setEditZip,
    setEditCity,
    setEditAddress1,
    setEditAddress2,
    email,
    phone,
  };

  const data = {
    firstName: editFName,
    lastName: editLName,
    shipperCompName: editShipperCompName,
    state: editState,
    zip: editZip,
    city: editCity,
    address1: editAddress1,
    address2: editAddress2,
    email,
    shipperId,
    phone,
  };

  const handleUpdateProfile = () => {
    let error = {};
    if (!data.firstName) {
      error.firstName = true;
    }
    if (!data.lastName) {
      error.lastName = true;
    }
    if (!data.shipperCompName) {
      error.shipperCompName = true;
    }
    if (Object.keys(error).length) {
      setErrors({ ...error });
      return false;
    } else {
      setShowLoader(true);
      setShipperDetails(data, checkShipperRegistration);
    }
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

  const checkShipperRegistration = (status) => {
    if (status) {
      setOpen(false);
      handleSnackClick();
      setTimeout(() => {
        router.push("/Dashboard");
      }, 1500);
    } else {
      setRegistrationError(true);
    }
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  return (
    <>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity="success">
          {t("register")}
        </Alert>
      </Snackbar>
      <>
        {showLoader && <FullPageLoader />}
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={classes.root}>
                <div className={classes.panelHeader}>
                  <h2>{t("shipper profile")}</h2>
                </div>
                <div className={`${classes.container} shipper_company_profile`}>
                  {!isEditing && firstName !== "" ? (
                    <>
                      <CustomTextField
                        label={t("firstName")}
                        value={firstName}
                        name="firstName"
                        errors={errors}
                      />
                      <CustomTextField
                        label={t("lastName")}
                        value={lastName}
                        name="lastName"
                        errors={errors}
                      />
                      <CustomTextField
                        label={t("companyName")}
                        value={shipperCompName}
                        name="shipperCompName"
                        errors={errors}
                      />
                      <CustomTextField
                        label={t("companyAddress")}
                        value={address1}
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
                      />{" "}
                    </>
                  ) : (
                    <EditableCompanyProfile
                      updateShipperProfileFunction={objToBePassed}
                      data={data}
                      classes={classes}
                      setErrors={setErrors}
                      errors={errors}
                    />
                  )}
                </div>
                <div className={`${classes.bttonGroup} btn-group`}>
                  <Button
                    className={classes.addButton}
                    onClick={() => {
                      setEditing(true);
                      setErrors({});
                    }}
                  >
                    {t("update")}
                  </Button>
                  {isEditing && (
                    <Button
                      className={classes.addButton}
                      onClick={() => {
                        setEditing(false);
                        setErrors({});
                      }}
                    >
                      {t("cancel")}
                    </Button>
                  )}
                  <Button
                    className={classes.addButton}
                    onClick={handleUpdateProfile}
                  >
                    {t("save")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    shipperDetails: state.shipperDetails.shipperInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShipperDetailsFromLocalStorage: (shipperDetails) =>
      setShipperDetailsFromLocalStorage(dispatch, shipperDetails),
    setShipperId: (shipperId) => setShipperId(dispatch, shipperId),
    setShipperDetails: (data, checkShipperRegistration) =>
      setShipperDetails(dispatch, data, checkShipperRegistration),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);

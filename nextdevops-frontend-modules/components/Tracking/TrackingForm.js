import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FullPageLoader from "../Helper/FullPageLoader";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#fff",
    boxShadow: "2px 10px 48px 7px rgba(0,0,0,0.75)",
    borderRadius: "0.75rem",
    overflow: "hidden",
    flexWrap: "wrap",
    marginTop: "80px",
    marginBottom: "10px",
    marginRight: "90px",
    ["@media (max-width:780px)"]: {
      marginRight: 0,
    },
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
  fieldsArea: {
    padding: "20px",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  margin: {
    margin: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  errorMessage: {
    zIndex: 100,
    background: "#fff",
    height: "50px",
    width: "100px",
    boxShadow: "2px 10px 48px 7px rgba(0,0,0,0.35)",
  },

  textFieldMargin: {
    marginLeft: "20px",
  },
  addButton: {
    background: "#589442",
    color: "white",
    width: "6rem",
    "&:hover": {
      background: "#589442",
      color: "white",
    },
  },

  addButtonDelivery: {
    background: "#589442",
    color: "white",
    marginLeft: "0.5rem",
    "&:hover": {
      background: "#589442",
      color: "white",
      marginLeft: "0.5rem",
    },
  },
  subContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const RESET_VALUES = {
  city: "",
  province: "",
  country: "",
};
const TrackingForm = ({ quoteId, postTrackingStatus }) => {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [currentShipmentState, setCurrentShipmentState] = useState("");
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const [state, setState] = useState({
    locationDetails: Object.assign({}, RESET_VALUES),
  });
  const { t } = useTranslation();

  const handleShowCurrentStatus = () => {
    let displayCurrentState;
    if (currentShipmentState === "") {
      displayCurrentState = t("started");
    } else if (currentShipmentState === t("started")) {
      displayCurrentState = t("in transit");
    } else if (currentShipmentState === t("in transit")) {
      displayCurrentState = t("in transit");
    } else if (currentShipmentState === t("out for delivery")) {
      displayCurrentState = t("completed");
    }
    return displayCurrentState;
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "47%",
    transform: "translate(-50%, -50%)",
    width: "35rem",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };

  const handleChange = (e) => {
    setState((prevState) => {
      prevState.locationDetails[e.target.name] = e.target.value;
      return { locationDetails: prevState.locationDetails };
    });

    if (e.target.value) {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const handleSave = (e, currentState) => {
    setShowLoader(true);
    let error = {},
      list = { ...state.locationDetails };
    if (!list.city) {
      error.city = true;
    }
    if (!list.province) {
      error.province = true;
    }
    if (!list.country) {
      error.country = true;
    }
    if (Object.keys(error).length) {
      setErrors({ ...error });
      return false;
    }
    const {
      locationDetails: { city, province },
    } = state;
    const dataToBeSend = {
      status: currentState,
      city,
      province,
      ts: new Date().getTime().toString(),
      quoteId,
    };
    setCurrentShipmentState(currentState);
    postTrackingStatus(dataToBeSend).then((res) => {
      if (res.status === 200) {
        setOpenStatusModal(true);
        setShowLoader(false);
      } else {
        alert(t("Try Again") + " " + t("Tracking Status Failed"));
      }
    });
    e.preventDefault();
  };

  const currentState = handleShowCurrentStatus();
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const handleStatusModalClose = () => {
    setOpenStatusModal(false);
    setState({
      locationDetails: Object.assign({}, RESET_VALUES),
      errors: {},
    });
  };
  const {
    locationDetails: { city, province, country },
  } = state;
  return (
    <Fragment>
      {showLoader && <FullPageLoader />}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your Location access is denied
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please allow the location access or fill the location manually.
          </Typography>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={{
                backgroundColor: "green",
                color: "white",
                width: "1.25rem",
                marginTop: "1rem",
              }}
              onClick={handleClose}
            >
              {t("close")}
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal open={openStatusModal} onClose={handleStatusModalClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("Tracking Status Success")}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {t("status")}: {currentState}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            {t("city")}: {city}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            {t("province")}: {province}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            {t("country")}: {country}
          </Typography>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={{
                backgroundColor: "green",
                color: "white",
                width: "1.25rem",
                marginTop: "1rem",
              }}
              onClick={handleStatusModalClose}
            >
              {t("close")}
            </Button>
          </div>
        </Box>
      </Modal>
      <div className="container">
        <div className={classes.subContainer}>
          <div className="col-md-6">
            <div className={classes.root}>
              <div className={classes.panelHeader}>
                <h2>{t("TRACKING_FORM_HEADER")}</h2>
              </div>
              <div className={classes.fieldsArea}>
                <div className="d-flex w-100">
                  <TextField
                    label="QuoteId"
                    type="string"
                    name="quoteId"
                    variant="outlined"
                    margin="normal"
                    value={quoteId}
                    onChange={handleChange}
                    fullWidth
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    label="City"
                    type="string"
                    name="city"
                    variant="outlined"
                    margin="normal"
                    value={city}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city && "Required"}
                  />
                  <TextField
                    label="Province"
                    type="string"
                    name="province"
                    variant="outlined"
                    margin="normal"
                    // className={classes.textFieldMargin}
                    value={province}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errors.province}
                    helperText={errors.province && "Required"}
                  />
                </div>
                <TextField
                  label="Country"
                  type="string"
                  margin="normal"
                  name="country"
                  variant="outlined"
                  onChange={handleChange}
                  value={country}
                  required
                  fullWidth
                  error={!!errors.country}
                  helperText={errors.country && "Required"}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>{t("Send Status Button")}</div>
                  <div style={{ display: "flex" }}>
                    <Button
                      className={classes.addButton}
                      onClick={(e) => handleSave(e, currentState)}
                    >
                      {currentState}
                    </Button>
                    {currentState === t("in transit") && (
                      <Button
                        className={classes.addButtonDelivery}
                        onClick={(e) => handleSave(e, t("out for delivery"))}
                      >
                        {t("out for delivery")}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TrackingForm;

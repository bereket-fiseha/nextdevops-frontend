import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import FullPageLoader from "../Helper/FullPageLoader";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UploadS3 from "../FileUpload/UploadS3";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(4),
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

  uploadDocument: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "20px",
  },
  uploadButtonContainer: {
    marginLeft: "50px",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
  },
  uploadButton: {
    background: "#589442",
    color: "white",
    marginLeft: "0.5rem",
    marginTop: "10px",
    width: "100px",
    justifyContent: "center",
    "&:hover": {
      background: "#589442",
      color: "white",
      marginLeft: "0.5rem",
    },
  },
  newDelivery: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "20px",
  },
  acceptButton: {
    marginTop: "10px",
  },
}));

function UpdateShipmentStatus({
  latitude,
  longitude,
  quoteId,
  postTrackingStatus,
}) {
  const classes = useStyles();

  const [showLoader, setShowLoader] = useState(false);
  const [shipmentLocation, setShipmentLocation] = useState("");
  const [currentShipmentState, setCurrentShipmentState] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState([]);
  const [showModalUpload, toggleModalUpload] = useState(false);
  const handleClose = () => setOpenModal(false);
  const { t } = useTranslation();

  const handleSave = (e, currentState) => {
    setShowLoader(true);
    setCurrentShipmentState(currentState);

    // add the SDk later for now calling the https url
    const apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    // calling api to get location data move to api calls folder
    axios.get(apiUrl).then((res) => {
      setShipmentLocation({
        status: currentState,
        city: res.data.city,
        province: res.data.principalSubdivision,
        ts: new Date().getTime(),
        quoteId,
        country: res.data.countryName,
      });
      const dataToBeSend = {
        status: currentState,
        city: res.data.city,
        province: res.data.principalSubdivision,
        ts: new Date().getTime().toString(),
        quoteId,
      };
      postTrackingStatus(dataToBeSend).then((res) => {
        if (res.status === 200) {
          setOpenModal(true);
          setShowLoader(false);
        } else {
          alert(t("Try Again") + " " + t("Tracking Status Failed"));
        }
      });
    });
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
    } else if (currentShipmentState === t("completed")) {
      displayCurrentState = t("completed");
    }
    return displayCurrentState;
  };
  const currentState = handleShowCurrentStatus();
  return (
    <div>
      {showLoader && <FullPageLoader />}
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("Tracking Status Success")}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {t("status")}: {shipmentLocation.status}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            {t("city")} {shipmentLocation.city}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            {t("province")}: {shipmentLocation.province}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            {t("country")}: {shipmentLocation.country}
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
      <Modal open={showModalUpload} onClose={() => toggleModalUpload(false)}>
        <Box sx={style}>
          <Fragment>
            {uploadedFileName.length === 0 && (
              <div className={classes.uploadDocument}>
                {t("upload proof of delivery")}
                <UploadS3
                  setUploadedFileName={setUploadedFileName}
                  uploadedFileName={uploadedFileName}
                />
              </div>
            )}
          </Fragment>
          {uploadedFileName.length !== 0 && (
            <div className={classes.newDelivery}>
              `${t("are you available")}`
              <div className={classes.acceptButton}>
                <Button variant="success" onClick={() => {}}>
                  {t("yes")}
                </Button>
                <Button
                  variant="danger"
                  style={{ marginLeft: "20px" }}
                  onClick={() => {}}
                >
                  {t("no")}
                </Button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {currentState !== t("completed") && (
          <div>{t("Send Status Button")}</div>
        )}
        <div style={{ display: "flex" }}>
          {currentState !== t("completed") && (
            <Button
              className={classes.addButton}
              onClick={(e) => handleSave(e, currentState)}
            >
              {currentState}
            </Button>
          )}
          {currentState === t("in transit") && (
            <Button
              className={classes.addButtonDelivery}
              onClick={(e) => handleSave(e, t("out for delivery"))}
            >
              {t("out for delivery")}
            </Button>
          )}

          {currentState === t("completed") && (
            <div className={classes.uploadButtonContainer}>
              {t("click to upload")}
              <Button
                className={classes.uploadButton}
                onClick={() => toggleModalUpload(true)}
              >
                {t("upload")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateShipmentStatus;

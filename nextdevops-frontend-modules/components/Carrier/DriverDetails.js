import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import DriverDetailsFormTable from "./DriverDetailsFormTable";
import Snackbar from "@material-ui/core/Snackbar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import FullPageLoader from "../Helper/FullPageLoader";
import { useTranslation } from "react-i18next";

const StyledButton = withStyles({
  root: {
    backgroundColor: "#589442",
    color: "white !important",
    marginLeft: "47%",
    marginBottom: "1rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#589442",
      color: "white !important",
      marginLeft: "47%",
      marginBottom: "1rem",
      cursor: "pointer"
    }
  }
})(Button);

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

const DriverDetails = ({ props }) => {
  const { register, handleSubmit } = useForm();
  const [items, setItems] = useState({ items: {} });

  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();

  useEffect(async () => {
    const carrierDetails = localStorage.getItem("carrierDetails");
    if (carrierDetails) {
      props.setCarrierDetailsFromLocalStorage(JSON.parse(carrierDetails));
      await props.setCarrierId(JSON.parse(carrierDetails).carrierId);
    }
  }, []);

  const saveItems = item => {
    if (!item.driverId) {
      item.driverId = new Date().getTime().toString();
    }
    item.carrierId = props.carrierDetails.loggedInUserId;
    setItems(prevState => {
      let items = prevState.items;
      items[item.driverId] = item;
      return { items };
    });
  };
  const handleDestroy = itemId => {
    setItems(prevState => {
      let items = prevState.items;
      delete items[itemId];
      return { items };
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

  const handleClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  const checkPostDriverDetails = status => {
    if (status) {
      setOpen(false);
      handleSnackClick();

      setTimeout(() => router.push("/carrier/DriverDetails"), 3000);
    } else {
      setRegistrationError(true);
    }
  };

  const onSubmit = () => {
    if (!Object.keys(items.items).length) {
      return false;
    } else {
      setOpen(true);
      setShowLoader(true);
      let driverDetails = Object.keys(items).map(itemid => items[itemid]);
      const driverItems = driverDetails.map(obj => Object.values(obj));
      const flattenedValue = driverItems.flat();
      props.postDriverDetails(flattenedValue).then(response => {
        if (response.status === 200) {
          checkPostDriverDetails(true);
          setShowLoader(false);
        }
      });
    }
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
          Driver added successfully
        </Alert>
      </Snackbar>
      <DriverDetailsFormTable
        items={items}
        saveItems={saveItems}
        handleDestroy={handleDestroy}
      />
      <StyledButton
        disabled={!Object.keys(items.items).length}
        onClick={onSubmit}
      >
        {t("submit")}
      </StyledButton>

      <Backdrop open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default DriverDetails;

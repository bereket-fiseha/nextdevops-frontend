import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { setShipperDetails } from "../redux/actions/shipperRegistration";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Geocode from "react-geocode";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { FormControl, InputLabel, Select } from "@material-ui/core";
Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
Geocode.enableDebug();

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    background: "#fff",
    boxShadow: "2px 10px 48px 7px rgba(0,0,0,0.75)",
    borderRadius: "12px",
    overflow: "hidden",
    flexWrap: "wrap"
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
  fieldsArea: {
    padding: "20px"
  },
  margin: {
    margin: theme.spacing(1)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  errorMessage: {
    zIndex: 100,
    background: "#fff",
    height: "50px",
    width: "100px",
    boxShadow: "2px 10px 48px 7px rgba(0,0,0,0.35)"
  },

  textFieldMargin: {
    marginLeft: "20px"
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ShipperRegistration = props => {
  const { register, handleSubmit, setValue } = useForm();
  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const { t } = useTranslation();
  const [address1, setAddress1] = useState("");
  const [state, setState] = useState({
    dontHaveRegisteredCompany: false,
    companyAddress: false
  });
  const [selectedZip, setSelectedZip] = useState("");
  const [addressPostalCodes, setAddressPostalCodes] = useState([]);

  const handleSnackClick = () => {
    setSnackBarOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  const router = useRouter();
  const checkShipperRegistration = status => {
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

  const onSubmit = data => {
    setOpen(true);
    const shipperDetails = JSON.stringify({
      ...data,
      address1,
      zip: selectedZip,
      companyAddress: companyAddress,
      shipperId: props.userId,
      shipperType: props.shipperType
    });
    props.setShipperDetails(
      JSON.parse(shipperDetails),
      checkShipperRegistration
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { dontHaveRegisteredCompany, companyAddress } = state;
  const { email, phone } = props;

  const classes = useStyles();

  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    options: {
      types: []
    },
    onPlaceSelected: async place => {
      console.log(place);
      const address = place.formatted_address,
        addressArray = place.address_components,
        city = getCity(addressArray),
        area = getArea(addressArray),
        state = getState(addressArray),
        latValue = place.geometry.location.lat(),
        lngValue = place.geometry.location.lng();

      const findNearbyPostalCodes = await axios.get(
        `http://api.geonames.org/findNearbyPostalCodes?lat=${latValue}&lng=${lngValue}&username=geonames_lilspam&type=json`
      );
      setAddressPostalCodes(findNearbyPostalCodes.data.postalCodes);
      setValue("address1", address);
      setAddress1(address);
      setValue("city", city);
      setValue("state", state);
      setValue("state", state);
      // setValue('zip', postalCode)
    }
  });

  const getCity = addressArray => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  const getArea = addressArray => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  const getState = addressArray => {
    let _state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          _state = addressArray[i].long_name;
          return _state;
        }
      }
    }
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.root}
        autocomplete="off"
      >
        <div className={classes.panelHeader}>
          <h2>{t("contact info")}</h2>
        </div>

        <div className={classes.fieldsArea}>
          <div className="d-flex w-100">
            <TextField
              label={t("firstName")}
              type="string"
              inputRef={register}
              name="firstName"
              variant="outlined"
              margin="normal"
              required
              fullWidth
            />

            <TextField
              label={t("lastName")}
              type="string"
              name="lastName"
              className={classes.textFieldMargin}
              inputRef={register}
              variant="outlined"
              margin="normal"
              required
              fullWidth
            />
          </div>

          {dontHaveRegisteredCompany ? (
            <TextField
              label={t("companyName")}
              type="string"
              variant="outlined"
              margin="normal"
              inputRef={register}
              name="shipperCompName"
              fullWidth
              required
            />
          ) : (
            <TextField
              label={t("companyName")}
              type="string"
              variant="outlined"
              margin="normal"
              inputRef={register}
              name="shipperCompName"
              fullWidth
              required
            />
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={dontHaveRegisteredCompany}
                onChange={handleChange}
                name="dontHaveRegisteredCompany"
              />
            }
            label={t("tick")}
          />
          <TextField
            label={t("Email")}
            type="email"
            value={email}
            margin="normal"
            inputRef={register}
            name="email"
            variant="outlined"
            required
            fullWidth
          />

          <TextField
            label={t("phone")}
            type="tel"
            value={phone}
            inputRef={register}
            name="phone"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </div>

        <div className={classes.panelHeader}>
          <h2>{t("companyAddress")}</h2>
        </div>

        <div className={classes.fieldsArea}>
          {/* <TextField
            label={t("address")}
            type="string"
            inputRef={register}
            name="address1"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          /> */}
          <TextField
            // ref={ref}
            label={t("address")}
            type="string"
            // inputRef={register}
            inputRef={ref}
            name="address1"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={companyAddress}
                onChange={handleChange}
                name="companyAddress"
              />
            }
            label={t("tick if company address")}
          />
          <TextField
            label={t("apartment suite")}
            type="string"
            inputRef={register}
            name="address2"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label={t("city")}
            type="string"
            inputRef={register}
            name="city"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            label={t("state")}
            type="string"
            className={classes.textFieldMargin}
            inputRef={register}
            name="state"
            variant="outlined"
            margin="normal"
            required
          />
          {/* <TextField
            label={t("zipCode")}
            type="number"
            className={classes.textFieldMargin}
            inputRef={register}
            name="zip"
            variant="outlined"
            margin="normal"
            required
          /> */}
          <FormControl
            style={{ marginTop: 15, marginLeft: "20px", minWidth: 250 }}
          >
            <InputLabel
              style={{ paddingLeft: 10, marginTop: -5, marginLeft: 8 }}
              htmlFor="address_zip_select"
            >
              {t("zipCode")}
            </InputLabel>
            <Select
              onChange={ev => {
                setSelectedZip(ev.target.value);
              }}
              inputRef={register}
              name="zip"
              variant="outlined"
              label={t("zipCode")}
              margin="normal"
              required
              style={{ color: "black" }}
              inputProps={{
                itemRef: register,
                name: "zip",
                required: true,
                id: "address_zip_select"
              }}
            >
              <option aria-label="None" value="" />
              {addressPostalCodes.map(option => (
                <option
                  aria-label={option.postalCode}
                  value={option.postalCode}
                >
                  {option.postalCode}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>

        <br />
        <div className="row w-100">
          <Button
            style={{ backgroundColor: "#589442" }}
            type="submit"
            className="primary-submit-button"
          >
            {t("submit")}
          </Button>
        </div>
      </form>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {registrationError ? (
        <div className={classes.errorMessage}>
          <p>{t("something went wrong")}</p>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = state => {
  return {
    shipperDetails: state.shipperDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShipperDetails: (data, checkShipperRegistration) =>
      setShipperDetails(dispatch, data, checkShipperRegistration)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperRegistration);

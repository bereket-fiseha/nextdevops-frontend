import React, { useState } from "react";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { FormControl, Select } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import ReactSelect from "react-select";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Snackbar } from "@material-ui/core";
import Button from "react-bootstrap/Button";
import MuiAlert from "@material-ui/lab/Alert";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import style from "../styles/Carrier.module.css";
import { useTranslation } from "react-i18next";
import Geocode from "react-geocode";
import axios from "axios";
Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
Geocode.enableDebug();

const saleTaxData = [
  { value: "Alberta GST", label: "Alberta GST" },
  { value: "British Columbia PST", label: "British Columbia PST" },
  { value: "Monitoba PST", label: "Monitoba PST" },
  { value: "New Brunswick HST", label: "New Brunswick HST" },
];

const CustomTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#15e95c",
    },
    "& label": {
      color: "#15e95c",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#15e95c",
    },
    "& .Mui-disabled": {
      color: "green",
    },
    "& .MuiOutlinedInput-root": {
      color: "#15e95c",
      "& fieldset": {
        borderColor: "#15e95c",
      },
      "&:hover fieldset": {
        borderColor: "#15e95c",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#15e95c",
      },
    },
  },
})(TextField);

const GreenCheckbox = withStyles({
  root: {
    color: "green",
    "&$checked": {
      color: "green",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    flexWrap: "wrap",
    boxShadow: "2px 10px 48px 7px rgba(0,0,0,0.75)",
    borderRadius: "12px",
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
  header: {
    width: "100%",
    height: "50px",
    padding: "10px",
    background: "#589442",
    paddingLeft: "30px",
    // borderRadius: "12px",
  },
  fieldsArea: {
    padding: "20px",
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
  carrierOperationDestination: {
    display: "flex",
    // flexDirection: "column",
    padding: "20px 20px 0 20px",
    justifyContent: "space-between",
    width: "100%",
  },
  carrierOperationDest: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    marginLeft: 20,
    ["@media (max-width:780px)"]: {
      marginLeft: 0,
      marginTop: 20,
    },
  },

  addButton: {
    background: "#589442",
    color: "white !important",
    marginLeft: "20%",
    marginTop: "70px",
  },
  addButtonNo: {
    background: "#589442",
    color: "white !important",
    marginLeft: "47%",
    marginTop: "70px",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CarrierRegistration = (props) => {
  const defaultValues = {
    saleTax: "yes",
    email: props.email,
    phone: props.phone,
  };
  const { register, handleSubmit, control, watch, setValue } =
    useForm(defaultValues);
  const isSaleTax = watch("saleTax");
  const carrierOperationData = watch("carrierOperation");

  const [state, setState] = useState({
    dontHaveRegisteredCompany: false,
    companyAddress: false,
  });
  // sale tax dropdown options
  const [selectedValue, setSelectedValue] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCarrierBorderValue, setCarrierBorderValue] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const [address1, setAddress1] = useState("");
  const [selectedZip, setSelectedZip] = useState("");
  const [addressPostalCodes, setAddressPostalCodes] = useState([]);
  const { t } = useTranslation();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
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

  const checkCarrierRegistration = (status) => {
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
  const onSubmit = (data) => {
    const carrierDetails = JSON.stringify({
      ...data,
      address1,
      zip: selectedZip,
      registeredSaleTax: selectedValue,
      carrierId: props.userId,
    });
    props.setCarrierDetails(
      JSON.parse(carrierDetails),
      checkCarrierRegistration
    );
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const multiSelectHandle = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const carrierSelectHandle = (e) => {
    setCarrierBorderValue(e.target.value);
  };

  const { dontHaveRegisteredCompany, companyAddress } = state;
  const { email, phone } = props;
  const buttonStyle = isSaleTax ? { marginLeft: "60%" } : { marginLeft: "0" };

  const classes = useStyles();
  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    options: {
      types: [],
    },
    onPlaceSelected: async (place) => {
      console.log(place);
      const address = place.formatted_address,
        addressArray = place.address_components,
        city = getCity(addressArray),
        area = getArea(addressArray),
        state = getState(addressArray),
        latValue = place.geometry.location.lat(),
        lngValue = place.geometry.location.lng();

      // const postalCode = findNearbyPostalCodes.data.postalCodes[0].postalCode;
      setValue("address1", address);
      setAddress1(address);
      setValue("city", city);
      setValue("state", state);
      setValue("state", state);
      // setValue('zip', postalCode)
      const findNearbyPostalCodes = await axios.get(
        `http://api.geonames.org/findNearbyPostalCodes?lat=${latValue}&lng=${lngValue}&username=geonames_lilspam&type=json`
      );

      setAddressPostalCodes(findNearbyPostalCodes.data.postalCodes);
    },
  });

  const getCity = (addressArray) => {
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

  const getArea = (addressArray) => {
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

  const getState = (addressArray) => {
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
      <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
        <div className={classes.header}>
          <h2 style={{ color: "white", textAlign: "center" }}>
            {t("carrier registration")}
          </h2>
        </div>
        {/* <div> */}
        <div className={classes.carrierOperationDestination}>
          <div className={style.carrierOperation}>
            <label>{t("my carrier operation")}</label>
            <Controller
              name="carrierOperation"
              control={control}
              rules={{ required: true }}
              as={
                <Select>
                  <MenuItem value="">Select...</MenuItem>
                  <MenuItem value="Within the Canadian border">
                    {t("within canada border")}
                  </MenuItem>
                  <MenuItem value="Across the Canadian border">
                    {t("across canada border")}
                  </MenuItem>
                  <MenuItem value="Within and Across the Canadian border">
                    {t("within & across")}
                  </MenuItem>
                </Select>
              }
            />
          </div>

          {carrierOperationData !== "Within the Canadian border" && (
            <div className={classes.carrierOperationDest}>
              <div>
                <label>{t("specify destination")}</label>
              </div>
              <Controller
                name="carrierOperationDestination"
                control={control}
                rules={{ required: true }}
                as={
                  <Select>
                    <MenuItem value="">{t("specify destination")}</MenuItem>
                    <MenuItem value="Mexico">Mexico</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="Maxico and USA">Mexico and USA</MenuItem>
                  </Select>
                }
              />
            </div>
          )}
        </div>
        <div style={{ padding: "20px" }}>
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
              style={{ marginLeft: "20px" }}
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
              name="carrierCompName"
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
              name="carrierCompName"
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
          <br />

          <h2 style={{ margin: "20px 0 0 0" }}>{t("companyAddress")}</h2>

          <br />
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
            style={{ marginLeft: "20px" }}
            inputRef={register}
            name="state"
            variant="outlined"
            margin="normal"
            required
          />
          {/* <TextField
            label={t("zipCode")}
            type="number"
            style={{ marginLeft: "20px" }}
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
                onChange={(ev) => {
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
                id: "address_zip_select",
              }}
            >
              <option aria-label="None" value="" />
              {addressPostalCodes.map((option) => (
                <option
                  aria-label={option.postalCode}
                  value={option.postalCode}
                >
                  {option.postalCode}
                </option>
              ))}
            </Select>
          </FormControl>
          <div className="d-flex w-100">
            {carrierOperationData !== "Within the Canadian border" && (
              <TextField
                label={t("dotNumber")}
                type="number"
                inputRef={register}
                name="dotNumber"
                variant="outlined"
                margin="normal"
                required
              />
            )}
            {carrierOperationData !== "Across the Canadian border" && (
              <TextField
                label={t("cvor number")}
                type="number"
                inputRef={register}
                style={{ marginLeft: "20px" }}
                name="CVORNumber"
                variant="outlined"
                margin="normal"
              />
            )}
          </div>
          {carrierOperationData !== "Within the Canadian border" && (
            <div>
              <div className="d-flex">
                <TextField
                  label={t("cbsa number")}
                  type="number"
                  inputRef={register}
                  name="CBSANumber"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                />
              </div>
              <div className={style.MC_number}>
                <>
                  <label style={{ marginTop: "20px" }}>
                    {t("travel interstate")}
                  </label>
                  <TextField
                    label={t("mc number")}
                    type="number"
                    inputRef={register}
                    name="MCNumber"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                </>
              </div>
            </div>
          )}
          <div>
            <section>
              <label style={{ marginLeft: "20px" }}>
                {t("register for sale tax")}
              </label>
              <input
                type="radio"
                name="saleTax"
                value="yes"
                selected
                ref={register}
                style={{ color: "#15e95c", marginLeft: "20px" }}
              />
              {t("yes")}
              <input
                type="radio"
                name="saleTax"
                value="no"
                ref={register}
                style={{ color: "#15e95c", marginLeft: "20px" }}
              />
              {t("no")}
            </section>
          </div>
          {isSaleTax === "yes" && (
            <>
              <div className={style.saletax}>
                <label>{t("what sales tax are")}</label>
                <ReactSelect
                  isMulti
                  options={saleTaxData}
                  onChange={multiSelectHandle}
                ></ReactSelect>
              </div>
              <Button type="submit" className={classes.addButton}>
                {t("submit")}
              </Button>
            </>
          )}
          {isSaleTax !== "yes" && (
            <Button type="submit" className={classes.addButtonNo}>
              {t("submit")}
            </Button>
          )}
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

export default CarrierRegistration;

import React, {useState} from "react";
import Editable from "../Helper/Editable";
import styles from "../../styles/Shipper.module.css";
import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import axios from "axios";
const regex = /[^a-z0-9]/gi;
import { FormControl, InputLabel, Select } from "@material-ui/core";

const CustomField = ({
  label,
  value,
  name = "",
  handler,
  setErrors = null,
  errors = {},
  inputRef = "",
}) => (
  <TextField
    id="outlined-required"
    label={label}
    value={value}
    variant="outlined"
    onChange={(e) => {
      if (name === "zipCode") {
        e.currentTarget.value = e.currentTarget.value.replace(regex, "");
      } else {
        if (e.target.value) {
          setErrors && setErrors({ ...errors, [name]: false });
        }
      }
      handler(e.target.value);
    }}
    style={{ margin: "5px" }}
    error={!!errors[name]}
    helperText={errors[name] && "Required"}
    inputRef={inputRef}
  />
);

export default ({
  updateShipperProfileFunction,
  data,
  classes,
  setErrors,
  errors,
}) => {
  const { t } = useTranslation();
  const {
    setEditFName,
    setEditLName,
    setEditCity,
    setEditState,
    setEditAddress1,
    setEditAddress2,
    setEditShipperCompName,
    setEditZip,
    email,
    phone,
  } = updateShipperProfileFunction;

  const {
    firstName,
    lastName,
    city,
    state,
    address1,
    address2,
    shipperCompName,
    zip,
  } = data;

  const [addressPostalCodes, setAddressPostalCodes] = useState([]);

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
      const findNearbyPostalCodes = await axios.get(
        `http://api.geonames.org/findNearbyPostalCodes?lat=${latValue}&lng=${lngValue}&username=geonames_lilspam&type=json`
      );
      // const postalCode = findNearbyPostalCodes.data.postalCodes[0].postalCode;
      setEditAddress1(address);
      setEditCity(city);
      setEditState(state);
      // setEditZip(postalCode);
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
      <CustomField
        label={t("firstName")}
        value={firstName}
        name="firstName"
        handler={setEditFName}
        setErrors={setErrors}
        errors={errors}
      />
      <CustomField
        label={t("lastName")}
        value={lastName}
        name="lastName"
        handler={setEditLName}
        setErrors={setErrors}
        errors={errors}
      />
      <CustomField
        label={t("companyName")}
        value={shipperCompName}
        name="shipperCompName"
        handler={setEditShipperCompName}
        setErrors={setErrors}
        errors={errors}
      />
      <CustomField
        label={t("companyAddress")}
        // value={address1}
        handler={() => {
          // setEditAddress1
        }}
        inputRef={ref}
      />
      <TextField
        id="outlined-helperText"
        label={t("email")}
        defaultValue={email}
        style={{ margin: "5px" }}
        variant="outlined"
        disabled
      />
      <TextField
        id="outlined-helperText"
        label={t("phone")}
        defaultValue={phone}
        style={{ margin: "5px" }}
        disabled
        variant="outlined"
      />
      {address2 !== "" && (
        <CustomField
          label={t("homeAddress")}
          value={address2}
          handler={setEditAddress2}
        />
      )}
      <CustomField
        label={t("city")}
        value={city}
        fullWidth={false}
        handler={setEditCity}
      />
      <CustomField
        label={t("state")}
        value={state}
        fullWidth={false}
        handler={setEditState}
      />
      {/* <CustomField
        label={t("zipCode")}
        name='zipCode'
        value={zip}
        fullWidth={false}
        handler={setEditZip}
      /> */}
      <FormControl style={{ marginTop: 15, minWidth: 250 }}>
        <InputLabel
          style={{ paddingLeft: 10, marginTop: -5, marginLeft: 8 }}
          htmlFor="address_zip_select"
        >
          {t("zipCode")}
        </InputLabel>
        <Select
          onChange={(ev) => {
            setEditZip(ev.target.value);
          }}
          name="zip"
          variant="outlined"
          label={t("zipCode")}
          margin="normal"
          required
          style={{ color: "black" }}
          inputProps={{
            name: "zip",
            required: true,
            id: "address_zip_select",
          }}
        >
          <option aria-label="None" value="" />
          {addressPostalCodes.map((option) => (
            <option aria-label={option.postalCode} value={option.postalCode}>
              {option.postalCode}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

import React, { useState, useEffect } from "react";
import {
  setShipperRequestQuotes,
  getCarrierByLocation,
  setShipperDetailsFromLocalStorage,
  setShipperId
} from "../redux/actions/shipperRegistration";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Select from "react-select";
import Items from "../components/ShipperItems/items";
import MediaCard from "../components/CarrierSearch/CarrierCard";
import Container from "@material-ui/core/Container";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import LargeShipperPaymentTerm from "../components/Shipper/LargeShipperPaymentTerm";
import style from "../styles/Shipper.module.css";
import {
  FormControl,
  InputLabel,
  makeStyles,
  Select as SelectMdd,
  TextField
} from "@material-ui/core";
import Input from "../components/BOL/Input";
import { useTranslation } from "react-i18next";
import FullPageLoader from "../components/Helper/FullPageLoader";
import moment from "moment";

const regex = /[^a-z0-9]/gi;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "30%",
    ["@media (max-width:780px)"]: {
      width: "100%"
    }
  },
  root: {
    background: "#fff",
    boxShadow: "2px 10px 48px 7px rgba(0,0,0,0.75)",
    borderRadius: "12px",
    overflow: "hidden",
    marginTop: "80px",
    marginBottom: "10px"
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    padding: "1rem"
  },
  panelHeader: {
    background: "#589442 !important",
    height: "50px",
    padding: "10px",
    paddingLeft: "30px",
    width: "100%",
    "& h2": {
      color: "#fff",
      fontSize: "24px"
    }
  },
  margin: {
    margin: theme.spacing(1)
  },
  addButton: {
    background: "#589442",
    color: "white",
    marginTop: 10,
    "&:hover": {
      background: "#589402",
      color: "white"
    }
  },
  flexClass: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "700",
    marginTop: 20
  }
}));

const servicesData = [
  {
    value: "Shipment containing Hazardous Material",
    label: "Shipment containing Hazardous Material"
  },
  {
    value: "Shipment requiring fragile care",
    label: "Shipment requiring fragile care"
  },
  { value: "Require a Lift Gate", label: "Require a Lift Gate" },
  {
    value: "These Items are non-stackable",
    label: "These Items are non-stackable"
  }
];

const CustomSelect = ({
  classes,
  value = "",
  name = "",
  handleChange,
  label,
  options = [],
  required = false
}) => (
  <FormControl
    variant="outlined"
    required={required}
    className={classes.formControl}
  >
    <InputLabel htmlFor="outlined-label-native-simple">{label}</InputLabel>
    <SelectMdd
      native
      value={value}
      name={name}
      onChange={handleChange}
      label={label}
      inputProps={{
        name: name,
        id: "outlined-label-native-simple"
      }}
      style={{ minWidth: "33%" }}
    >
      {options.map(val => (
        <option value={val.key}>{val.value}</option>
      ))}
    </SelectMdd>
  </FormControl>
);

const handleCarrierReSearch = (setSwitchForm, setAvailableCarrier) => {
  setSwitchForm(false);
  setAvailableCarrier({});
};

const displayCarrier = (carrierIds, availableCarrier) => {
  const carrierNames = carrierIds.map(id =>
    availableCarrier.map(item =>
      item.carrierId === id ? item.carrierName : null
    )
  );
  const allCarrierNames = [...new Set(carrierNames.flat())].filter(
    x => x !== null && x !== ""
  );
  return (
    <ul>
      {allCarrierNames.map(item => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

const selectCarrier = (carrierIds, setCarrierIds, setSwitchForm) => {
  setCarrierIds(carrierIds);
  setSwitchForm(true);
};
const searchCarrierByLocation = (
  availableCarrier,
  carrierSearch,
  handleLocationChange,
  setCarrierIds,
  setSwitchForm,
  location,
  classes,
  errors,
  t,
  ref1,
  ref2
) => {
  return (
    <>
      <Container maxWidth="xs">
        <div className={style.find_carrier}>
          {t("source")}
          <input
            ref={ref1}
            name="source"
            // value={location.source}
            // onchange={handleLocationChange}
            // error={!!errors.source}
          />
          {t("destination")}
          <input
            ref={ref2}
            name="destination"
            // value={location.destination}
            // onchange={handleLocationChange}
            // error={!!errors.destination}
          />
          <Button className={classes.addButton} onClick={carrierSearch}>
            {t("search")}
          </Button>
        </div>
      </Container>
      <Container maxWidth="xl">
        {availableCarrier.length > 0 && (
          <MediaCard
            carrierId={availableCarrier}
            classes={classes}
            selectedCarrierHandle={carrierIds =>
              selectCarrier(carrierIds, setCarrierIds, setSwitchForm)
            }
          />
        )}
        {availableCarrier.length === 0 && <div>{t("no carrier found")}</div>}
      </Container>
    </>
  );
};

const ShipperRegistration = props => {
  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(async () => {
    // Access the user session on the client
    const shipperDetails = localStorage.getItem("shipperDetails");
    if (shipperDetails) {
      await props.setShipperDetailsFromLocalStorage(JSON.parse(shipperDetails));
      props.setShipperId(shipperDetails.shipperId);
    }
  }, []);
  const [items, setItems] = useState({ items: {} });
  const [availableCarrier, setAvailableCarrier] = useState({});
  const [switchForm, setSwitchForm] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [location, setLocation] = useState({
    source: "",
    destination: ""
  });
  const [carrierIds, setCarrierIds] = useState([]);
  const [outstandingDays, setOutStandingDays] = useState("0");
  const [depositPercentage, setDepositPercentage] = useState("");
  const [address, setAddress] = useState({});
  const [errors, setErrors] = useState({});

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

  const handleLocationChange = event => {
    let value = event.target.value;
    let name = event.target.name;

    setLocation(prevalue => {
      return {
        ...prevalue,
        [name]: value
      };
    });
    if (event.target.value) {
      setErrors({ ...errors, [event.target.name]: false });
    }
  };
  const handleDestroy = itemId => {
    setItems(prevState => {
      let items = prevState.items;
      delete items[itemId];
      return { items };
    });
  };

  const carrierSearch = () => {
    const err = {};
    if (!location.source) {
      err.source = true;
    }
    if (!location.destination) {
      err.destination = true;
    }
    if (Object.keys(err).length) {
      setErrors({ ...err });
      return false;
    }
    setShowLoader(true);
    props
      .getCarrierByLocation(location.source, location.destination)
      .then(res => {
        setAvailableCarrier(res);
        setShowLoader(false);
      })
      .catch(e => setShowLoader(false));

    setErrors({});
  };

  const { ref: ref1, autocompleteRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    options: {
      types: []
    },
    onPlaceSelected: place => {
      console.log(place);
      const address = place.formatted_address,
        addressArray = place.address_components,
        city = getCity(addressArray),
        area = getArea(addressArray),
        state = getState(addressArray),
        latValue = place.geometry.location.lat(),
        lngValue = place.geometry.location.lng();

      handleLocationChange({
        target: {
          value: address,
          name: "source"
        }
      });
    }
  });
  const { ref: ref2 } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    options: {
      types: []
    },
    onPlaceSelected: place => {
      console.log(place);
      const address = place.formatted_address,
        addressArray = place.address_components,
        city = getCity(addressArray),
        area = getArea(addressArray),
        state = getState(addressArray),
        latValue = place.geometry.location.lat(),
        lngValue = place.geometry.location.lng();

      handleLocationChange({
        target: {
          value: address,
          name: "destination"
        }
      });
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

  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const onSubmit = data => {
    setShowLoader(true);
    let shipmentDetails = Object.keys(items).map(itemid => items[itemid]);
    const {
      shipperDetails: {
        shipperInfo: { shipperId, shipperCompName }
      }
    } = props;
    console.log(
      shipperId,
      shipperCompName,
      localStorage.getItem("shipperDetails")
    );
    const shipmentItems = shipmentDetails.map(obj => Object.values(obj));
    const flattenedValue = shipmentItems.flat();
    const groupQuoteId = uuidv4();
    let sendBatchData = [];
    const largeShipperPaymentTerm = {
      outstandingDays: outstandingDays,
      depositPercentage: depositPercentage
    };
    carrierIds.map(carrierId => {
      sendBatchData.push(
        JSON.parse(
          JSON.stringify({
            ...address,
            shipmentDetails: flattenedValue,
            quoteId: `${uuidv4()}`,
            shipperId,
            shipperName: shipperCompName,
            carrierId,
            groupQuoteId,
            largeShipperPaymentTerm,
            kount: "0",
            qCreatedOn: moment().format("YYYY-MM-DD")
          })
        )
      );
    });
    props.setShipperRequestQuotes(sendBatchData);

    router.push("/QuotesReceivedShipper");
  };
  const [selectedValue, setSelectedValue] = useState([]);

  const handleChange = e => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const multiSelectHandle = e => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
  };

  const { shipperType } = props.shipperDetails.shipperInfo;

  return (
    <>
      {showLoader && <FullPageLoader />}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {!switchForm && (
              <div>
                {searchCarrierByLocation(
                  availableCarrier,
                  carrierSearch,
                  handleLocationChange,
                  setCarrierIds,
                  setSwitchForm,
                  location,
                  classes,
                  errors,
                  t,
                  ref1,
                  ref2
                )}
              </div>
            )}
            {switchForm && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={style.root}
                style={{
                  boxShadow: "2px 10px 48px 7px rgba(0,0,0,0.75)",
                  padding: "1rem",
                  borderRadius: "5px",
                  marginBottom: "12px",
                  marginTop: "80px"
                }}
              >
                <div className={style.postHeader}>
                  <h2
                    className={style.panelHeader}
                    style={{
                      backgroundColor: "#589442",
                      textAlign: "center",
                      fontWeight: "bold",
                      border: "1px solid white",
                      borderRadius: "5px",
                      padding: "5px"
                    }}
                  >
                    {t("request for qoute")}
                  </h2>
                  <div
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    {t("requesting qoute list")}
                    {displayCarrier(carrierIds, availableCarrier)}
                  </div>
                  <div className={classes.flexClass}>
                    {" "}
                    <span>{t("search different carriers")} </span>
                    <Button
                      size="small"
                      className={classes.addButton}
                      style={{ marginBottom: "1rem" }}
                      onClick={() =>
                        handleCarrierReSearch(
                          setSwitchForm,
                          setAvailableCarrier
                        )
                      }
                    >
                      {t("search again")}
                    </Button>
                  </div>
                  <div className={style.postHeader}>
                    <h2
                      className={style.panelHeader}
                      style={{
                        backgroundColor: "#589442",
                        textAlign: "center",
                        fontWeight: "bold",
                        border: "1px solid white",
                        borderRadius: "5px",
                        padding: "5px"
                      }}
                    >
                      {t("pick up address")}
                    </h2>
                    <div className="flex-wrap d-flex w-100">
                      <CustomSelect
                        label={t("Country")}
                        name="country"
                        handleChange={handleChange}
                        classes={classes}
                        ref={register}
                        value={address.country}
                        options={[
                          { key: "select", value: "Select..." },
                          { key: "canada", value: "Canada" },
                          { key: "usa", value: "USA" }
                        ]}
                        required
                      />
                      <TextField
                        id="outlined-number"
                        label={t("zipCode")}
                        className={classes.formControl}
                        name="zipCode"
                        ref={register}
                        InputLabelProps={{
                          shrink: true
                        }}
                        variant="outlined"
                        value={address.zipCode}
                        onChange={e => {
                          e.currentTarget.value = e.currentTarget.value.replace(
                            regex,
                            ""
                          );
                          handleChange(e);
                        }}
                      />
                      <CustomSelect
                        label={t("location type")}
                        name="location_type"
                        handleChange={handleChange}
                        ref={register}
                        classes={classes}
                        value={address.location_type}
                        options={[
                          { key: "select", value: "Select..." },
                          {
                            key: "Business with loading doc or forklift",
                            value: "Business with loading doc or forklift"
                          },
                          {
                            key: "Residential or limited access",
                            value: "Residential or limited access"
                          },
                          {
                            key: "Trade show or convention",
                            value: "Trade show or convention"
                          },
                          {
                            key: "Pickup at carrier terminal",
                            value: "Pickup at carrier terminal"
                          }
                        ]}
                      />
                    </div>
                  </div>
                  <div className={style.postHeader}>
                    <h2
                      className={style.panelHeader}
                      style={{
                        backgroundColor: "#589442",
                        textAlign: "center",
                        fontWeight: "bold",
                        border: "1px solid white",
                        borderRadius: "5px",
                        padding: "5px "
                      }}
                    >
                      {t("what are you shipping")}
                    </h2>
                    <div>
                      <CustomSelect
                        label={t("packing")}
                        name="packing"
                        handleChange={handleChange}
                        classes={classes}
                        ref={register}
                        value={address.packing}
                        options={[
                          { key: "select", value: "Select..." },
                          {
                            key: "cylinders",
                            value: "Cylinders"
                          },
                          {
                            key: "drums",
                            value: "Drums"
                          },
                          {
                            key: "Pails",
                            value: "Pails"
                          },
                          {
                            key: "Reels",
                            value: "Reels"
                          },
                          {
                            key: "Rolls",
                            value: "Rolls"
                          },
                          {
                            key: "Tubes/Pipes",
                            value: "Tubes/Pipes"
                          }
                        ]}
                      />
                      <CustomSelect
                        label={t("goods")}
                        name="goods"
                        handleChange={handleChange}
                        classes={classes}
                        ref={register}
                        value={address.goods}
                        options={[
                          { key: "select", value: "Select..." },
                          {
                            key: "new",
                            value: "New Goods"
                          },
                          {
                            key: "old",
                            value: "Old Goods"
                          }
                        ]}
                      />
                    </div>
                    <div className={style.saletax}>
                      <label>{t("other services")}</label>
                      <Select
                        isMulti
                        options={servicesData}
                        onChange={multiSelectHandle}
                      ></Select>
                    </div>
                  </div>

                  <div className={style.dimentions}>
                    <Items
                      items={items}
                      saveItems={saveItems}
                      handleDestroy={handleDestroy}
                    />
                  </div>
                  {shipperType === "largeShipper" && (
                    <LargeShipperPaymentTerm
                      handleOutstandingPaymentDays={setOutStandingDays}
                      handleDepositPercent={setDepositPercentage}
                      outstandingDays={outstandingDays}
                      depositPercentage={depositPercentage}
                    />
                  )}

                  <div className="row w-100">
                    <button type="submit" className="primary-submit-button">
                      {t("submit")}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    shipperDetails: state.shipperDetails,
    availableCarrierForRFQ: state.availableCarrierForRFQ
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShipperRequestQuotes: setShipperRequestQuotes,
    getCarrierByLocation: (source, destination) =>
      getCarrierByLocation(dispatch, source, destination),
    setShipperDetailsFromLocalStorage: shipperDetails =>
      setShipperDetailsFromLocalStorage(dispatch, shipperDetails),
    setShipperId: shipperId => setShipperId(dispatch, shipperId)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperRegistration);

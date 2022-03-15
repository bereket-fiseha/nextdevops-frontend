import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import style from "../../styles/Shipper.module.css";
import { v4 as uuidv4 } from "uuid";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FullPageLoader from "../Helper/FullPageLoader";
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import TextField from "@material-ui/core/TextField";

// Messages
const required = "This field is required";
const maxLength = "Your input exceed maximum length";

// Error Component
const errorMessage = (error) => {
  return <div className={style.invalid}>{error}</div>;
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const AvailabilityForm = ({
  carrierPostVehicleAvailability,
  carrierId,
  carrierName,
}) => {
  const { register, handleSubmit, errors, setValue, control } = useForm({
    defaultValues: {
      dateAvailableFrom: moment().format('MM/DD/YYYY'),
      dateAvailableTill: moment().format('MM/DD/YYYY'),
      source: '',
      destination: '',

    }
  });

  const { ref: ref1, autocompleteRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    options: {
        types: [],
     },
    onPlaceSelected: (place) => {
      console.log(place);
      const address = place.formatted_address;
      setValue("source", address);
    },
  });
  const { ref: ref2, autocompleteRef: autocompleteRef2 } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    options: {
        types: [],
     },
    onPlaceSelected: (place) => {
      console.log(place);
      const address = place.formatted_address;

      setValue("destination", address);
    },
  });

  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [registrationError, setVehicleAvailabilityError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const classes = useStyles();

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

  const checkVehicleAvailability = (status) => {
    if (status) {
      setOpen(false);
      handleSnackClick();
      setTimeout(() => {
        router.push("/Dashboard");
      }, 1500);
    } else {
      setVehicleAvailabilityError(true);
    }
  };
  const onSubmit = (data) => {
    setShowLoader(true);
    const finalData = JSON.stringify({
      ...data,
      dateAvailableFrom: moment(data.dateAvailableFrom).format('MM/DD/YYYY'),
      dateAvailableTill: moment(data.dateAvailableTill).format('MM/DD/YYYY'),
      carrierId,
      id: uuidv4(),
      carrierName,
    });
    carrierPostVehicleAvailability(finalData)
      .then((res) => {
        if (res.status === 200) {
          checkVehicleAvailability(true);
          setShowLoader(false);
        }
        return response;
      })
      .catch((err) => {
        checkVehicleAvailability(false);
        setShowLoader(false);
        return err;
      });
  };

  return (
    <>
    {showLoader && <FullPageLoader />}
      <div className="root-container">
        <Snackbar
          open={snackBarOpen}
          autoHideDuration={3000}
          onClose={handleSnackClose}
        >
          <Alert onClose={handleSnackClose} severity="success">
            {t("register")}
          </Alert>
        </Snackbar>
        <div className="container">
          <div class="row">
            <div className="col-sm-12">
              <h3>{t("Vehicle availability")}</h3>
              <p className={style.info}>
                <em>{`*${t("book shipper")}`}</em>
              </p>
            </div>
            <div className="col-sm-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <Controller
                    name="source"
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }) => {
                        return <input placeholder="Vehicle source" className="form-control" ref={ref1} />
                    }}
                    />
                  {/* <input
                    className="form-control"
                    type="text"
                    placeholder="Vehicle source"
                    name="source"
                    ref={ref1}
                    // ref={register({ required: true, maxLength: 20 })}
                  /> */}
                  {errors.source &&
                    errors.source.type === "required" &&
                    errorMessage(required)}
                  {errors.source &&
                    errors.source.type === "maxLength" &&
                    errorMessage(maxLength)}
                </div>
                <div className="form-group">
                  <Controller
                    name="destination"
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }) => {
                        return <input placeholder="Vehicle destination" className="form-control" ref={ref2} />
                    }}
                    />
                  {/* <input
                    className="form-control"
                    type="text"
                    placeholder="Vehicle destination"
                    name="destination"
                    // ref={register({ required: true, maxLength: 50 })}
                    ref={ref2}
                  /> */}
                  {errors.destination &&
                    errors.destination.type === "required" &&
                    errorMessage(required)}
                  {errors.destination &&
                    errors.destination.type === "maxLength" &&
                    errorMessage(maxLength)}
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="date"
                    placeholder="Date available from (MM/DD/YYYY)"
                    name="dateAvailableFrom"
                    // onChange={(ev) => {
                    //   setValue('dateAvailableFrom', moment(ev.target.value).format('MM/DD/YYYY'));
                    // }}
                    ref={register({
                      required: true,
                      // pattern:
                      //   /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/i,
                    })}
                  />
                  {errors.dateAvailableFrom &&
                    errorMessage("Please use the following format MM/DD/YYYY")}
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="date"
                    placeholder="Date available till (MM/DD/YYYY)"
                    name="dateAvailableTill"
                    // onChange={(ev) => {
                    //   setValue('dateAvailableTill', moment(ev.target.value).format('MM/DD/YYYY'));
                    // }}
                    ref={register({
                      required: true,
                      // pattern:
                      //   /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/i,
                    })}
                  />
                  {errors.dateAvailableTill &&
                    errorMessage("Please use the following format MM/DD/YYYY")}
                </div>
                <div className="form-group">
                  <label>{t("Vehicle type")}</label>
                  <select ref={register} name="type" className="form-control">
                    <option value="trailer">Trailer</option>
                    <option value="hazmat">Hazmat</option>
                    <option value="dryvan">Dry Van</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Capacity of vehicle in cubic feet"
                    name="Capacity"
                    ref={register({ required: true, maxLength: 50 })}
                  />
                  {errors.Capacity &&
                    errors.Capacity.type === "required" &&
                    errorMessage(required)}
                  {errors.Capacity &&
                    errors.Capacity.type === "maxLength" &&
                    errorMessage(maxLength)}
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Description of Vehicle"
                    className="form-control"
                    name="About"
                    ref={register}
                  />
                </div>
                <div className="form-group">
                  <input className="btn btn-success" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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

export default AvailabilityForm;

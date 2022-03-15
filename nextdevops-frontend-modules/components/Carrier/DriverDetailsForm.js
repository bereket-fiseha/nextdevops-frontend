import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const RESET_VALUES = {
  driverId: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#fff",
    boxShadow: "2px 10px 48px 7px rgba(0,0,0,0.75)",
    borderRadius: "12px",
    overflow: "hidden",
    flexWrap: "wrap",
    marginTop: "80px",
    marginBottom: "0.75rem",
  },
  panelHeader: {
    background: "#589442",
    height: "50px",
    padding: "10px",
    paddingLeft: "30px",
    width: "100%",
    "& h2": {
      color: "#fff",
      fontSize: "1.5rem",
    },
  },
  fieldsArea: {
    padding: "1.25rem",
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
    marginLeft: "1.25rem",
  },
}));

const StyledButton = withStyles({
  root: {
    backgroundColor: "#589442",
    color: "white !important",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#589442",
      color: "white !important",
      cursor: "pointer",
    },
  },
})(Button);

const DriverDetailsForm = (props) => {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();

  const [state, setState] = useState({
    itemList: Object.assign({}, RESET_VALUES),
  });

  const handleChange = (e) => {
    setState((prevState) => {
      prevState.itemList[e.target.name] = e.target.value;
      return { itemList: prevState.itemList };
    });
    if (e.target.value) {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };
  const handleSave = (e) => {
    let error = {},
      list = { ...state.itemList };
    if (!list.firstName) {
      error.firstName = true;
    }
    if (!list.lastName) {
      error.lastName = true;
    }
    if (!list.email) {
      error.email = true;
    }
    if (!list.phoneNumber) {
      error.phoneNumber = true;
    }
    if (Object.keys(error).length) {
      setErrors({ ...error });
      return false;
    }
    props.onSave(state.itemList);
    setState({
      itemList: Object.assign({}, RESET_VALUES),
      errors: {},
    });
    e.preventDefault();
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={classes.root}>
              <div className={classes.panelHeader}>
                <h2>{t("driver detail")}</h2>
              </div>
              <div className={classes.fieldsArea}>
                <div className="d-flex w-100">
                  <TextField
                    label={t("firstName")}
                    type="string"
                    name="firstName"
                    variant="outlined"
                    margin="normal"
                    value={state.itemList.firstName}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName && "Required"}
                  />
                  <TextField
                    label={t("lastName")}
                    type="string"
                    name="lastName"
                    variant="outlined"
                    margin="normal"
                    className={classes.textFieldMargin}
                    value={state.itemList.lastName}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName && "Required"}
                  />
                </div>
                <TextField
                  label={t("Email")}
                  type="email"
                  margin="normal"
                  name="email"
                  variant="outlined"
                  onChange={handleChange}
                  value={state.itemList.email}
                  required
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email && "Required"}
                />

                <TextField
                  label={t("phone")}
                  type="tel"
                  name="phoneNumber"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  value={state.itemList.phoneNumber}
                  fullWidth
                  required
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber && "Required"}
                />
                <StyledButton onClick={handleSave}>
                  {t("save & add more")}
                </StyledButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverDetailsForm;

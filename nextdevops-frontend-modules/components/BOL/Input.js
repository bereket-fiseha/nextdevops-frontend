import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  makeStyles,
  OutlinedInput,
} from "@material-ui/core";

const useStyles = makeStyles({
  formControl: {
    "& .MuiInputBase-input": {
      padding: 8,
    },
  },
});

const Input = ({
  parentClass = "",
  label = "",
  hideLabel = false,
  placeholder = "",
  htmlType = "text",
  onchange = () => {},
  value = "",
  name = "",
  hookForm = false,
  disabled = false,
  defaultValue = "",
  fullWidth = true,
  error = false,
}) => {
  const classes = useStyles();
  return (
    <>
      <Box className={`${parentClass}`}>
        <FormControl className={classes.formControl} fullWidth={fullWidth}>
          {!hideLabel && <FormHelperText>{label}</FormHelperText>}
          {hookForm ? (
            <OutlinedInput
              style={{ ...(disabled ? { background: "#eee" } : {}) }}
              fullWidth
              defaultValue={defaultValue}
            />
          ) : (
            <OutlinedInput
              style={{
                ...(disabled
                  ? { background: "#eee" }
                  : { background: "#fafafa" }),
              }}
              type={htmlType}
              name={name}
              fullWidth
              value={value}
              placeholder={placeholder}
              onChange={onchange}
              disabled={disabled}
              error={error}
            />
          )}
        </FormControl>
      </Box>
    </>
  );
};

export default Input;

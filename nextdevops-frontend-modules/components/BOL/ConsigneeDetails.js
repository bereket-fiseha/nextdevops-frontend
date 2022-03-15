import { Box, Grid } from "@material-ui/core";
import Input from "./Input";
import { useTranslation } from "react-i18next";

export const ConsigneeDetails = ({ disabled, values, handleChange, errors }) => {
  const {t} = useTranslation();
  return (
  <Box>
    <h6>{t("Consignee Details")}</h6>
    <Grid container spacing={2}>
      <Box mr={3} component={Grid} item sm={12}>
        <Input
          label={t("to")}
          name="consignee"
          value={values.consignee}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.consignee}
        />
      </Box>
      <Box component={Grid} item sm={12}>
        <Input
          label={t("_consignee")}
          name="consignee_firstName"
          value={values.consignee_firstName}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.consignee_firstName}
        />
      </Box>
      <Box component={Grid} item sm={12}>
        <Input
          label={t("address one")}
          name="consignee_address1"
          value={values.consignee_address1}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.consignee_address1}
        />
      </Box>

      <Box component={Grid} item sm={12}>
        <Input
          label={t("city")}
          name="consignee_city"
          value={values.consignee_city}
          onchange={handleChange}
          disabled={disabled}
        />
      </Box>
      <Box mr={3} component={Grid} item sm={12}>
        <Input
          label={t("address two")}
          name="consignee_address2"
          value={values.consignee_address2}
          onchange={handleChange}
          disabled={disabled}
        />
      </Box>
      <Box mr={3} component={Grid} item sm={6}>
        <Input
          label={t("trailer/car number")}
          name="consignee_vehicleNumber"
          value={values.consignee_vehicleNumber}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.consignee_vehicleNumber}
        />
      </Box>
      <Box mr={3} component={Grid} item sm={6}>
        <Input
          label="ROUTE"
          name="consignee_route"
          value={values.consignee_route}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.consignee_route}
        />
      </Box>
    </Grid>
  </Box>
);
  }
import { Box, Grid } from "@material-ui/core";
import Input from "./Input";
import { useTranslation } from "react-i18next";

export const ShipperDetails = ({ disabled, values, handleChange, errors }) => {
  const {t} = useTranslation();
  return (
  <Box>
    <h6>{t("shipper details")}</h6>
    <Grid container spacing={2}>
      <Box mr={3} component={Grid} item sm={12}>
        <Input
          label={t("from")}
          name="shipper_from"
          value={values.shipper_from}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.shipper_from}
        />
      </Box>
      <Box component={Grid} item sm={12}>
        <Input
          label={t("_shipper")}
          name="shipper_firstName"
          value={values.shipper_firstName}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.shipper_firstName}
        />
      </Box>
      <Box component={Grid} item sm={12}>
        <Input
          label={t("address")}
          name="shipper_address1"
          value={values.shipper_address1}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.shipper_address1}
        />
      </Box>

      <Box component={Grid} item sm={6}>
        <Input
          label={t("city")}
          name="shipper_city"
          value={values.shipper_city}
          onchange={handleChange}
          disabled={disabled}
        />
      </Box>
      <Box mr={3} component={Grid} item sm={6}>
        <Input
          label={t("province/postal")}
          name="shipper_zip"
          value={values.shipper_zip}
          onchange={handleChange}
          disabled={disabled}
        />
      </Box>
      <Box mr={3} component={Grid} item sm={12}>
        <Input
          label={t("special instructions")}
          name="shipper_instructions"
          value={values.shipper_instructions}
          onchange={handleChange}
          disabled={disabled}
        />
      </Box>
    </Grid>
  </Box>
);
  }
import { Box, Grid } from "@material-ui/core";
import Input from "./Input";
import { useTranslation } from "react-i18next";

export const CarrierDetails = ({ disabled, values, handleChange, errors }) => {
  const {t} = useTranslation();
  return (
  <Box>
    <h6>{t("carrier details")}</h6>
    <Grid container spacing={2}>
      <Box mr={3} component={Grid} item sm={6}>
        <Input
          htmlType="date"
          label={t("date")}
          name="carrier_date"
          value={values.carrier_date}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.carrier_date}
        />
      </Box>
      <Box component={Grid} item sm={6}>
        <Input
          label={t("carrier name")}
          name="firstName"
          value={values.firstName}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.firstName}
        />
      </Box>
      <Box component={Grid} item sm={12}>
        <Input
          label={t("carrier address")}
          name="address1"
          value={values.address1}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.address1}
        />
      </Box>

      <Box component={Grid} item sm={6}>
        <Input
          label={t("city")}
          name="carrier_city"
          value={values.carrier_city}
          onchange={handleChange}
          disabled={disabled}
        />
      </Box>
      <Box mr={3} component={Grid} item sm={6}>
        <Input
          label={t("postal code")}
          name="carrier_zip"
          value={values.carrier_zip}
          onchange={handleChange}
          disabled={disabled}
        />
      </Box>
      <Box mr={3} component={Grid} item sm={12}>
        <Input
          label={t("phone")}
          name="carrier_phone"
          value={values.carrier_phone}
          onchange={handleChange}
          disabled={disabled}
        />
      </Box>
      <Box mr={3} component={Grid} item sm={6}>
        <Input
          label="SAC"
          name="carrier_SAC"
          value={values.carrier_SAC}
          onchange={handleChange}
          disabled={disabled}
        />
      </Box>
      <Box component={Grid} item sm={6}>
        <Input
          label="DUNS"
          name="carrier_DUNS"
          value={values.carrier_DUNS}
          onchange={handleChange}
          disabled={disabled}
        />
      </Box>
      <Box component={Grid} item sm={6}>
        <Input
          label={t("shipping id #")}
          name="carrier_shippingId"
          value={values.carrier_shippingId}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.carrier_shippingId}
          focused={!!errors.carrier_shippingId}
        />
      </Box>
      <Box component={Grid} item sm={6}>
        <Input
          label={t("freight bill pro no")}
          name="carrier_frieghtBill"
          value={values.carrier_frieghtBill}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.carrier_frieghtBill}
        />
      </Box>
    </Grid>
  </Box>
);
  }
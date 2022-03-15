import { Box, Grid } from "@material-ui/core";
import Input from "./Input";
import { useTranslation } from "react-i18next";

export const PayerDetails = ({ disabled, values, handleChange, errors }) => {
  const { t } = useTranslation();
  return (
  <Box>
    <h6>{t("Payer Details")}</h6>
    <Grid container spacing={2}>
      <Box mr={3} component={Grid} item sm={12}>
        <Input
          label={t("name")}
          name="payer_firstName"
          value={values.payer_firstName}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.payer_firstName}
        />
      </Box>
      <Box component={Grid} item sm={12}>
        <Input
          label={t("address")}
          name="payer_address1"
          value={values.payer_address1}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.payer_address1}
        />
      </Box>
      <Box component={Grid} item sm={12}>
        <Input
          label={t("city")}
          name="payer_city"
          value={values.payer_city}
          onchange={handleChange}
          disabled={disabled}
        />
      </Box>
      <Box component={Grid} item sm={12}>
        <Input
         label={t("province/postal")}
          name="payer_zip"
          value={values.payer_zip}
          onchange={handleChange}
          disabled={disabled}
        />
      </Box>
      <Box mr={3} component={Grid} item sm={12}>
        <Input
          label={t("no_sid")}
          name="payer_sid"
          value={values.payer_sid}
          onchange={handleChange}
          disabled={disabled}
          error={!!errors.payer_sid}
        />
      </Box>
    </Grid>
  </Box>
);
  }
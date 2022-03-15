import { Box, Grid, MenuItem, Select, Tooltip } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useState } from "react";
import Input from "./Input";
import { useTranslation } from "react-i18next";

export const ChargesBill = ({
  isShipper,
  values,
  handleChange,
  errors,
  disabled,
}) => {
  const [chargesTo, setChargesTo] = useState(isShipper);
  const { t } = useTranslation();
  return (
    <Box>
      <h6>
        {t("charges bill to")}
        <Tooltip
          title={"THIRD PARTY FREIGHT CHARGES BILL TO"}
          placement="top-center"
        >
          <HelpOutlineIcon />
        </Tooltip>
        <Select
          style={{ marginLeft: 20 }}
          variant="outlined"
          value={chargesTo}
          onChange={(ev) => setChargesTo(ev.target.value)}
          disabled={disabled}
        >
          <MenuItem value={"Shipper"}>{t("_shipper")}</MenuItem>
          <MenuItem value={"Consignee"}>{t("_consignee")}</MenuItem>
          <MenuItem value={"Other"}>{t("other")}</MenuItem>
        </Select>
      </h6>
      {chargesTo !== "Other" && (
        <Grid container spacing={2}>
          <Box mr={3} component={Grid} item sm={6}>
            <Input
              label={t("bill to name")}
              name="bill_to"
              value={values.bill_to}
              onchange={handleChange}
              error={!!errors.bill_to}
              disabled={disabled}
            />
          </Box>
          <Box component={Grid} item sm={6}>
            <Input
              label={t("telephone")}
              name="bill_telephone"
              value={values.bill_telephone}
              onchange={handleChange}
              disabled={disabled}
            />
          </Box>
          <Box component={Grid} item sm={12}>
            <Input
              label={t("bill to address one")}
              name="bill_address1"
              value={values.bill_address1}
              onchange={handleChange}
              error={!!errors.bill_address1}
              disabled={disabled}
            />
          </Box>

          <Box component={Grid} item sm={12}>
            <Input
              label={t("bill to address two")}
              name="bill_address2"
              value={values.bill_address2}
              onchange={handleChange}
              disabled={disabled}
            />
          </Box>
          <Box mr={3} component={Grid} item sm={3}>
            <Input
              label={t("city")}
              name="bill_city"
              value={values.bill_city}
              onchange={handleChange}
              disabled={disabled}
            />
          </Box>
          <Box mr={3} component={Grid} item sm={3}>
            <Input
              label={t("postal code")}
              name="bill_postal_code"
              value={values.bill_postal_code}
              onchange={handleChange}
              disabled={disabled}
            />
          </Box>
          <Box mr={3} component={Grid} item sm={3}>
            <Input
              label={t("province")}
              name="bill_province"
              value={values.bill_province}
              onchange={handleChange}
              disabled={disabled}
            />
          </Box>
          <Box component={Grid} item sm={3}>
            <Input
              label={t("country")}
              name="bill_country"
              value={values.bill_country}
              onchange={handleChange}
              disabled={disabled}
            />
          </Box>
        </Grid>
      )}
    </Box>
  );
};

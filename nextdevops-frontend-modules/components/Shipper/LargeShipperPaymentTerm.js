import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    select: {
        '&:before': {
            borderColor: "green",
            backgroudColor: "white",
            color: "white"
        },
        '&:after': {
            borderColor: "green",
            color: "white"
        },
        '&:hover:not(.Mui-disabled):before': {
            borderColor: 'green',
        },
        '& .MuiSelect-outlined.MuiSelect-outlined': {
            color: "white"
        }
    },
    inputLabel: {
        color: "green",
        borderColor: "green",
    }
  }));

const PaymentTerm = ({ handleOutstandingPaymentDays, handleDepositPercent, outstandingDays, depositPercentage }) => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <>
            <div>{t("payment term")}</div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel className={classes.inputLabel} id="outstanding_days">{t("outstanding days")}</InputLabel>
                <Select
                    labelId="outstanding days"
                    id="outstanding days"
                    value={outstandingDays}
                    onChange={e => handleOutstandingPaymentDays(e.target.value)}
                    label={t("outstanding days")}
                    className={classes.select}
                >
                    <MenuItem value="">
                        <em>{t("none")}</em>
                    </MenuItem>
                    <MenuItem value="on delivery">{t("on delivery")}</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="14">14</MenuItem>
                    <MenuItem value="30">30</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel className={classes.inputLabel} id="deposit_percentage">{t("deposit")}</InputLabel>
                <Select
                    labelId="deposit percentage"
                    id="deposit_percentage "
                    value={depositPercentage}
                    onChange={e => handleDepositPercent(e.target.value)}
                    label={t("deposit")}
                    className={classes.select}
                >
                    <MenuItem value="">
                        <em>{t("none")}</em>
                    </MenuItem>
                    <MenuItem value="0">0%</MenuItem>
                    <MenuItem value="25">25%</MenuItem>
                    <MenuItem value="50">50%</MenuItem>
                    <MenuItem value="75">75%</MenuItem>
                    <MenuItem value="100">100%</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default PaymentTerm;
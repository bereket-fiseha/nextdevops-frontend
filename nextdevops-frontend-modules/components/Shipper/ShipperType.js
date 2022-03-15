import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    background: "#fff",
    boxShadow: "2px 10px 48px 7px rgba(0,0,0,0.75)",
    borderRadius: "12px",
    overflow: "hidden",
    flexWrap: "wrap"
  },
  panelHeader: {
    background: "#589442",
    height: "50px",
    padding: "10px",
    paddingLeft: "30px",
    width: "100%",
    "& h2": {
      color: "#fff",
      fontSize: "24px"
    }
  },
  fieldsArea: {
    padding: "20px",
    display: "contents"
  },

  dropdown: {
    padding: "20px"
  }
}));
const ShipperType = ({ setShipperType }) => {
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation();
  const classes = useStyles();
  const onSubmit = data => {
    const { loadFreq, noOfPallet, totalWeight } = data;
    if (
      loadFreq === "frequent" &&
      noOfPallet === "7" &&
      totalWeight === "6000"
    ) {
      setShipperType("largeShipper");
    } else {
      setShipperType("smallShipper");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.root}
      autocomplete="off"
    >
      <div className={classes.panelHeader}>
        <h2>{t("registration option")}</h2>
      </div>

      <div className={classes.fieldsArea}>
        <div className={classes.dropdown}>
          <select ref={register} name="noOfPallet" className="form-control">
            <option value="">{t("pallet one")}</option>
            <option value="6">{t("pallet two")}</option>
            <option value="7">{t("pallet three")}</option>
          </select>
        </div>

        <div className={classes.dropdown}>
          <select ref={register} name="totalWeight" className="form-control">
            <option value="">{t("weight one")}</option>
            <option value="5000">{t("weight two")}</option>
            <option value="6000">{t("weight three")}</option>
          </select>
        </div>

        <div className={classes.dropdown}>
          <select ref={register} name="loadFreq" className="form-control">
            <option value="">{t("load frequency")}</option>
            <option value="once">{t("one off")}</option>
            <option value="infrequent">{t("infrequent")}</option>
            <option value="frequent">{t("frequent")}</option>
          </select>
        </div>
        <br />
        <div className="row w-100">
          <Button
            style={{ backgroundColor: "#589442" }}
            type="submit"
            className="primary-submit-button"
          >
            {t("proceed")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ShipperType;

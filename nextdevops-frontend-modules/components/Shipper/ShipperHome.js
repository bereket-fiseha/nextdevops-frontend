import React, { useEffect } from "react";
import Header from "./Header";
import { Auth } from "aws-amplify";
import {
  getShipperDetails,
  setShipperId,
} from "../../redux/actions/shipperRegistration";
import { setCarrierId } from "../../redux/actions/carrierRegistration";
import { connect } from "react-redux";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import HomeAbout from "../HomeAbout/HomeAbout";
import CheckIcon from "@material-ui/icons/Check";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  itemLi: {
    "& span": {
      fontSize: "18px",
      lineHeight: "1 !important",
      color: "black !important",
    },
  },
  itemClass: {
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
  },
}));
const ItemsList = ({ conditions }) => {
  const classes = useStyles();

  return (
    <List style={{ paddingBottom: "1.5rem" }}>
      {conditions.map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem key={value} className={classes.itemClass}>
            <ListItemIcon>
              <CheckIcon
                edge="start"
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText
              id={labelId}
              primary={value}
              className={classes.itemLi}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

const Shipper = (props) => {
  const { t } = useTranslation();
  const data = [
    {
      headingText: `${t("shipper option1")}`,
      description: "",
      tagLine: `${t("shipper option1 tagLine")}`,
      conditions: [],
      btnText: `${t("shipper option1 button")}`,
      btn2Text: "",
      imgUrl: "/images/shipper2.jpeg",
      btnLink: "/Dashboard",
      btn2Link: "",
      btnHideOnLogin: false,
      btn2HideOnLogin: true,
    },
    {
      headingText: `${t("shipper option2")}`,
      description: "",
      tagLine: `${t("shipper option2 tagLine")}`,
      conditions: [
        `${t("qoutes")}`,
        `${t("shipper option2 option2")}`,
        `${t("bill lading")}`,
        `${t("shipper option2 option3")}`,
        `${t("shipper option2 option4")}`,
      ],
      btnText: `${t("shipper option1 button")}`,
      btn2Text: `${t("shipper option2 button2")}`,
      imgUrl: "/images/shipper3.jpeg",
      btnLink: "/Dashboard",
      btn2Link: "",
      btnHideOnLogin: false,
      btn2HideOnLogin: true,
    },
    {
      headingText: `${t("shipper option3")}`,
      description: "",
      conditions: [
        `${t("shipper option3 option1")}`,
        `${t("shipper option3 option2")}`,
      ],
      btnText: `${t("shipper option3 button")}`,
      btn2Text: "",
      imgUrl: "/images/shipper4.jpeg",
      btnLink: "/Dashboard",
      btn2Link: "",
      btnHideOnLogin: false,
      btn2HideOnLogin: true,
    },
  ];
  useEffect(() => {
    // Access the user session on the client
    Auth.currentAuthenticatedUser()
      .then((user) => {
        localStorage.setItem("user", true);
        const shipperId = user.attributes.sub;
        const email = user.attributes.email;
        if (localStorage.getItem("shipperDetails") === null) {
          localStorage.setItem("shipperRegister", false);
        } else {
          localStorage.setItem("shipperRegister", true);
        }
        props.getShipperDetails(shipperId, email);
        props.setShipperId(shipperId);
        props.setCarrierId("");
      })
      .catch((err) => localStorage.setItem("user", false));
  }, [localStorage.getItem("shipperDetails")]);
  const { shipperDetails } = props;
  return (
    <div className="shipper-landing">
      <Header shipperDetails={shipperDetails} />
      {data.map((item) => (
        <HomeAbout
          key={item.headingText}
          title={item.headingText}
          header={item.description}
          body={<ItemsList conditions={item.conditions} />}
          btnText={item.btnText}
          btn2Text={item.btn2Text}
          image2={item.imgUrl}
          content={item.content || ""}
          link={item.btnLink}
          btn2Link={item.btn2Link}
          btnHideOnLogin={item.btnHideOnLogin}
          btn2HideOnLogin={item.btn2HideOnLogin}
          tagLine={item.tagLine}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shipperDetails: state.shipperDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShipperDetails: (shipperId, email) =>
      getShipperDetails(dispatch, shipperId, email),
    setShipperId: (shipperId) => setShipperId(dispatch, shipperId),
    setCarrierId: () => setCarrierId(dispatch, ""),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shipper);

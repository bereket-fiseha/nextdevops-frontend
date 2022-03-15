import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import {
  getCarrierDetails,
  setCarrierId,
} from "../../redux/actions/carrierRegistration";
import { setShipperId } from "../../redux/actions/shipperRegistration";
import { connect } from "react-redux";
import Button from "./Button";
import styles from "../../styles/Shipper.module.css";
import FullPageLoader from "../Helper/FullPageLoader";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import HomeAbout from "../HomeAbout/HomeAbout";
import Slider from "../Slider";
import HeroSection from "../common/HeroSection";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
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

const Carrier = (props) => {
  const {
    carrierDetails: { carrierInfo, isLoading },
  } = props;

  const { t } = useTranslation();

  const data = [
    {
      headingText: t("There is a load for you"),
      description: "",
      tagLine: "",
      conditions: ["Hazmat", "Reefer", "Dry Van", "Flatbed"],

      slider: [
        {
          imgUrl: "/images/slider1.jpeg",
        },
        {
          imgUrl: "/images/slider2.jpeg",
        },
        {
          imgUrl: "/images/slider3.jpeg",
        },
        {
          imgUrl: "/images/slider4.jpeg",
        },
      ],

      btnText: t("continue"),
      btn2Text: "",
      imgUrl: "",
      btnLink: "/Dashboard",
      btn2Link: "",
      btnHideOnLogin: false,
      btn2HideOnLogin: true,
    },
    {
      headingText: t("Invoice Factoring"),
      description: "",
      tagLine: t("Carrier Tagline"),
      conditions: [],
      btnText: t("continue"),
      btn2Text: "",
      imgUrl: "/images/carrier3.jpeg",
      btnLink: "/Dashboard",
      btn2Link: "",
      btnHideOnLogin: false,
      btn2HideOnLogin: true,
    },
    {
      headingText: t("Flexible Commercial Terms"),
      description: "",
      tagLine: t("Carrier Tagline Two"),
      conditions: [],
      btnText: t("continue"),
      btn2Text: "",
      imgUrl: "/images/carrier4.jpeg",
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
        const carrierId = user.attributes.sub;
        const email = user.attributes.email;
        if (localStorage.getItem("carrierDetails") === null) {
          localStorage.setItem("carrierRegister", false);
        } else {
          localStorage.setItem("carrierRegister", true);
        }
        props.getCarrierDetails(carrierId, email);
        props.setCarrierId(carrierId);
        props.setShipperId("");
      })
      .catch((err) => localStorage.setItem("user", false));
  }, [localStorage.getItem("carrierDetails")]);
  const buttonLink =
    carrierInfo.firstName !== "" ? "/Dashboard" : "/carrier/carrierDash";
  return (
    <>
      {isLoading && <FullPageLoader />}
      {/* <div className="carrier-landing">
        <span className={styles.center}>
          You have landed on the your Home page
        </span>
        <Button carrierDetails={carrierInfo} />
      </div> */}
      <HeroSection
        headingText={t("Carrier Main Tagline")}
        imgUrl="/images/carrier1.jpeg"
        btnText={t("continue")}
        btnLink={buttonLink}
        subHeading=""
        textPosition="left"
        btnHideOnLogin={false}
      />
      {data.map((item) => (
        <HomeAbout
          slider={item.slider}
          key={item.headingText}
          title={item.headingText}
          header={item.description}
          body={<ItemsList conditions={item.conditions} />}
          btnText={item.btnText}
          btn2Text={item.btn2Text}
          image2={item.imgUrl}
          content={item.content || ""}
          link={buttonLink}
          btn2Link={item.btn2Link}
          btnHideOnLogin={item.btnHideOnLogin}
          btn2HideOnLogin={item.btn2HideOnLogin}
          tagLine={item.tagLine}
        />
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    carrierDetails: state.carrierDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCarrierDetails: (carrierId, email) =>
      getCarrierDetails(dispatch, carrierId, email),
    setCarrierId: (carrierId) => setCarrierId(dispatch, carrierId),
    setShipperId: () => setShipperId(dispatch, ""),
  };
};

export default withAuthenticator(
  connect(mapStateToProps, mapDispatchToProps)(Carrier)
);

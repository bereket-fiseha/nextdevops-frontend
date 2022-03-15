import { useState, useEffect } from 'react'
import HomeAbout from "../components/HomeAbout/HomeAbout";
import TestimonialSection from "../components/Testimonials/TestimonialSection";
import Video from "../components/Video";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import ClientOnly from "../components/ClientOnly";
import HeroSection from "../components/common/HeroSection";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import FullPageLoader from '../components/Helper/FullPageLoader';

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
export default function Home() {
  const { t } = useTranslation();
  const [showLoader, setShowLoader] = useState(true);

  const [hideButtonOneLogin, setHideButtonOneLogin] = useState(true)
  const [buttonOneText, setButtonOneText] = useState(t("get free quote"))
  const [buttonOneLink, setButtonOneLink] = useState("/shipper/ShipperLoginPage")

  useEffect(() => {
    const shipperRegister = localStorage.getItem("shipperRegister");
    if (shipperRegister) {
      setHideButtonOneLogin(shipperRegister === "true" ? true : false);
      setButtonOneText(t("Register"))
      setButtonOneLink("/shipper/shipperDash")
    }

    const carrierRegister = localStorage.getItem("carrierRegister");
    if (carrierRegister) {
      setHideButtonOneLogin(carrierRegister === "true" ? true : false);
      setButtonOneText(t("Register"))
      setButtonOneLink("/carrier/carrierDash")
    }
    setShowLoader(false)
  }, [])

  const data = [
    {
      headingText: `${t("_shippers")}`,
      description:
        `${t("_shippers")}`,
      conditions: [
        t("All online, no more paper"),
        t("Get comparable quotes"),
        t("Choose your carrier"),
        t("Track your load"),
        t("Make secure payments"),
        t("Pull reports and view statistics"),
        t("Much more ..."),
      ],
      btnText: `${t("home slider button text")}`,
      btn2Text: `${t("get a quote")}`,
      imgUrl: "/images/home-2.jpeg",
      btnLink: "/LearnMoreShipper",
      btn2Link: "/shipper/ShipperLoginPage",
      btnHideOnLogin: false,
      btn2HideOnLogin: true,
    },
    {
      headingText: `${t("carriers")}`,
      description:
        `${t("carrier partner")}`,
      conditions: [
        t("Choose a preferred load"),
        t("Fast payment"),
        t("Full digital document workflow"),
        t("Factor your load"),
        t("Trusted support"),
        t("Pull reports and view statistics"),
        t("Much more ..."),
      ],
      btnText: `${t("home slider button text")}`,
      btn2Text: `${t("shipper option2 button2")}`,
      imgUrl: "/images/home-3.jpeg",
      btnLink: "/LearnMoreCarrier",
      btn2Link: "/carrier/CarrierLoginPage",
      btnHideOnLogin: false,
      btn2HideOnLogin: true,
    },
  ];
  return (
    <>
      <Head>
        <title>Loadhitch Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showLoader && <FullPageLoader />}
      <ClientOnly>
        <HeroSection
          headingText={t("an online market place for shipper")}
          btnText={buttonOneText}
          btnLink={buttonOneLink}
          btn2Text={t("shipper option2 button2")}
          btn2Link={"/carrier/CarrierLoginPage"}
          imgUrl="/images/home-1.jpeg"
          subHeading={t(`home page sub section`)}
          btnHideOnLogin={hideButtonOneLogin}
          btn2HideOnLogin={true}
        />
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
          />
        ))}
        <Video />
        <TestimonialSection />
      </ClientOnly>
    </>
  );
}

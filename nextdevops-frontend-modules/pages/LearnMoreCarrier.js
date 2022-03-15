import Head from "next/head";
import ClientOnly from "../components/ClientOnly";
import HeroSection from "../components/common/HeroSection";
import Section from "../components/common/Section";
import HomeAbout from "../components/HomeAbout/HomeAbout";
import { useTranslation } from "react-i18next";

export default function LearnMoreCarrier() {
  const { t } = useTranslation();
  const carrierArr = [
    {
      headingText: t("FLEXIBILITY OF LOAD"),
      description: "",
      conditions: [],
      btnText: t("Sign-up for free"),
      btnLink: "/carrier/CarrierLoginPage",
      imgUrl: "/images/carrier-2.jpeg",
      content: [
        `${t("carrier_option_1")}`,
        `${t("business rolling in")}`,
      ],
      btnHideOnLogin: true,
    },
    {
      headingText: t("Fully Digital Experience"),
      description: "",
      conditions: [],
      btnText: t("Sign-up for free"),
      btnLink: "/carrier/CarrierLoginPage",
      imgUrl: "/images/carrier-3.jpeg",
      content: [`${t("no more papers")}`],
      btnHideOnLogin: true,
    },
    {
      headingText: t("Fast reliable payment"),
      description: "",
      conditions: [],
      btnText: t("Sign-up for free"),
      btnLink: "/carrier/CarrierLoginPage",
      imgUrl: "/images/carrier-4.jpg",
      content: [`${t("when load is delivered")}`],
      btnHideOnLogin: true,
    },
  ];
  return (
    <>
      <Head>
        <title>{`Loadhitch ${t("home header button 2")}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClientOnly>
        <HeroSection
          headingText={t("YOUR LOAD SHOULD NOT BURDEN YOU")}
          imgUrl="/images/carrier-1.jpeg"
          btnText={t("Sign-up for free")}
          btnLink="/carrier/CarrierLoginPage"
          subHeading={t("find right load")}
          btnHideOnLogin={true}
        />
        {carrierArr.map((item) => (
          <HomeAbout
            key={item.headingText}
            title={item.headingText}
            header={item.headingText}
            body={item.content.map(itm => <p>{itm}</p>)}
            btnText={item.btnText}
            link={item.btnLink}
            btn2Text={item.btn2Text}
            btn2Link={item.btn2Link}
            image2={item.imgUrl}
            btnHideOnLogin={item.btnHideOnLogin}
            btn2HideOnLogin={item.btn2HideOnLogin}
          />
        ))}
      </ClientOnly>
    </>
  );
}

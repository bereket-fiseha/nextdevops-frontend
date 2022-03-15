import Head from "next/head";
import ClientOnly from "../components/ClientOnly";
import HeroSection from "../components/common/HeroSection";
import HomeAbout from "../components/HomeAbout/HomeAbout";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const shipperArr = [
    {
      headingText: t("streamline your supply"),
      description: "",
      conditions: [],
      btnText: t("get free quote"),
      btnLink: "/shipper/ShipperLoginPage",
      imgUrl: "/images/shipper-2.jpeg",
      content: [
        `${t("shipper_option_1")}`,
        `${t("shipper_option_2")}`,
        `${t("shipper_option_3")}`,
      ],
      btnHideOnLogin: true,
    },
    {
      headingText: t("Peace of Mind"),
      description: "",
      conditions: [],
      btnText: t("get free quote"),
      btnLink: "/shipper/ShipperLoginPage",
      imgUrl: "/images/shipper-3.jpg",
      content: [
        `${t("shipper_option_4")}`,
        `${t("shipper_option_5")}`,
        `${t("shipper_option_6")}`,
      ],
      btnHideOnLogin: true,
    },
    {
      headingText: `Loadhitch ${t("Safe-Pay")}`,
      description: "",
      conditions: [],
      btnText: t("get free quote"),
      btnLink: "/shipper/ShipperLoginPage",
      imgUrl: "/images/shipper-4.jpg",
      content: [
        `${t("shipper_option_7")}`,
        `${t("shipper_option_8")}`,
      ],
      btnHideOnLogin: true,
    },
  ];
  return (
    <>
      <Head>
        <title>{`Loadhitch ${t("home page label")}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClientOnly>
        <HeroSection
          headingText=""
          imgUrl="/images/shipper-1.jpeg"
          btnText={t("shipper option3 button")}
          btnLink="/shipper/ShipperLoginPage"
          subHeading={`${t("shipper sub heading")}`}
          textPosition="left"
          btnHideOnLogin={true}
        />

        {shipperArr.map((item) => (
          <HomeAbout
            key={item.headingText}
            title={item.headingText}
            header={item.headingText}
            body={item.content.map((itm) => (
              <p>{itm}</p>
            ))}
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

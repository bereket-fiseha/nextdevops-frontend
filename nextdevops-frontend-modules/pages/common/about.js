import React from "react";
import AboutContent from "../../components/AboutContent";
import Features from "../../components/Features/Features";
import PageBanner from "../../components/PageBanner";
import PartnersCarousel from "../../components/PartnersCarousel";
import Services from "../../components/Services/Services";
import TeamCard from "../../components/TeamCards/TeamCards";
import { useTranslation } from "react-i18next";

const about = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageBanner
        pageTitle={t("about page title")}
        firstText="Home"
        secondText={t("about page label")}
        firstTextLink="/"
      />
      <AboutContent />
      <Features />
      <Services ServiceSectionName="Services" ServiceTitle={t("How We Can Help?")} />
      <PartnersCarousel />
      <TeamCard />
    </>
  );
};

export default about;

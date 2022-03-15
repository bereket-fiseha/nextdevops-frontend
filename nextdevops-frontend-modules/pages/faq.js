import React from "react";
import AboutContent from "../components/AboutContent";
import FaqSection from "../components/FAQArea/FaqSection";
import PageBanner from "../components/PageBanner";
import PartnersCarousel from "../components/PartnersCarousel";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageBanner
        pageTitle={t("faq_page label")}
        firstText="Home"
        secondText={t("faq page label")}
        firstTextLink="/"
      />
      <FaqSection />
      <PartnersCarousel />
    </>
  );
};

export default FAQ;

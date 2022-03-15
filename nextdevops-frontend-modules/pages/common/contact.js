import React from "react";
import ContactContent from "../../components/ContactArea/ContactSection";
import PageBanner from "../../components/PageBanner";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageBanner
        pageTitle={t("contact_page label")}
        firstText="Home"
        secondText={t("contact")}
        firstTextLink="/"
      />
      <ContactContent />
    </>
  );
};

export default Contact;

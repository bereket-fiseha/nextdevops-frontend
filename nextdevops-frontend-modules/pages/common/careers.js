import React from "react";
import About from "../../components/Careers/About/About";
import MeetCompany from "../../components/Careers/MeetCompany/MeetCompany";
import Positions from "../../components/Careers/Positions/Positions";
import PageBanner from "../../components/PageBanner";
import PartnersCarousel from "../../components/PartnersCarousel";
import Services from "../../components/Services/Services";
import TeamCard from "../../components/TeamCards/TeamCards";
import { useTranslation } from 'react-i18next';

const about = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageBanner
        pageTitle={t("careers_page title")}
        firstText="Home"
        secondText={t("careers")}
        firstTextLink="/"
      />
      <About />
      <Positions />
      <MeetCompany />
      <Services ServiceSectionName="" ServiceTitle={t("Perks and Benefits")} />
      <TeamCard />
      <PartnersCarousel />
    </>
  );
};

export default about;

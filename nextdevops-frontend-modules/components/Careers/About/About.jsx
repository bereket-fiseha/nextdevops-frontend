import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div
        className="row justify-content-center"
        style={{
          padding: "100px 0",
          margin: "100px 0",
          borderBottom: "1px solid #97f57a",
        }}
      >
        <h2 className="text-center" style={{ maxWidth: '750px'}}>
          {t('careers page title')}
        </h2>
      </div>
    </div>
  );
};

export default About;

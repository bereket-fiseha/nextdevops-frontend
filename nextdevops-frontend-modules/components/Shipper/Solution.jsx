import React from "react";
import { useTranslation } from 'react-i18next';

const Solution = () => {
  const {t} = useTranslation();
  return (
    <div className="container shipper-solution">
      <div className="row">
        <div className="col-md-6 w-100">
          <img src={require("../../image/rubic.jpg")} alt="image" />
        </div>
        <div className="col-md-6">
          <h1>{t("customize solution")}</h1>
          <h3>
            {t("solution description")}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Solution;

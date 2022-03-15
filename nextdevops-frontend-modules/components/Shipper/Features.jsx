import React from "react";
import { useTranslation } from 'react-i18next';

const Features = () => {
  const {t} = useTranslation();
  return (
    <>
      <div className="container shipper-features">
        <div className="row">
          <h1>{t("what your requirement")}</h1>
        </div>
        <div className="row">
          <div className="col-md-3 w-100">
            <img src={require("../../image/Reefer/1.png")} alt="image" />
          </div>
          <div className="col-md-3 w-100" style={{ paddingTop: "40px" }}>
            <img src={require("../../image/Reefer/2.png")} alt="image" />
          </div>
          <div className="col-md-3 w-100" style={{ paddingTop: "30px" }}>
            <img src={require("../../image/Reefer/4.png")} alt="image" />
          </div>
          <div className="col-md-3 w-100">
            <img src={require("../../image/Reefer/3.png")} alt="image" />
          </div>
        </div>

        <div className="row">
          <h1>
            {t("carrier for you")}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Features;

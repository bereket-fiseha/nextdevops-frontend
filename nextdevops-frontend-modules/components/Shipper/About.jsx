import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const {t} = useTranslation();
  return (
        <div className="container shipper-about">
        <div className="row">
          <div className="col-md-6 w-100">
            <img src={require("../../image/shipper2.jpeg")} alt="image" style={{ width: '100%' }}/>
          </div>
          <div className="col-md-6">
            <h1 style={{ fontWeight: 'bold', textTransform: 'capitalize'}}>
              {t("carrier price")}
            </h1>
          </div>
        </div>
      </div>
    )
}

export default About

import React from "react";
import PositionBox from "./PositionBox";
import { useTranslation } from 'react-i18next';

const Positions = () => {
  const {t} = useTranslation();

  return (
    <div className="container" style={{ padding: "100px 0" }}>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h1 className="text-center" style={{ marginBottom: "30px" }}>
            {t('careers page open position title')}
          </h1>
        </div>
        <div className="col-md-12 d-flex justify-content-center" >
          <p
            className="text-center"
            style={{ fontSize: "1.1rem", color: "#767676", maxWidth: '750px' }}
          >
            {t('careers page open position description')}
          </p>
        </div>
        <div className="col-md-12">
          <div className="row" style={{ marginTop: "100px" }}>
            {Array(6)
              .fill()
              .map((item) => (
                <PositionBox key={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Positions;

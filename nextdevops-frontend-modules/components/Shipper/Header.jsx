import React from "react";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const Header = (props) => {
  const { t } = useTranslation();
  const {
    shipperDetails: { shipperInfo, isLoading },
  } = props;
  const buttonText = isLoading ? `${t("loading")}` : `${t("continue")}`;
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        paddingTop: "3rem",
      }}
    >
      <img
        className="w-100"
        src={require("../../image/shipper1.jpeg")}
        alt="image"
      />
      <div
        className="container shipper-header"
        style={{
          position: "absolute",
          zIndex: "1",
          margin: "0 auto",
          left: "0",
          right: "0",
          top: "10%",
        }}
      >
        <div className="row shipper_header">
          <h1 style={{ fontWeight: "bold" }}>{t("click of button")}</h1>
        </div>
        <div
          className="row shipper_button"
          style={{ justifyContent: "center", paddingTop: "6rem" }}
        >
          <Button
            buttonText={buttonText}
            shipperDetails={shipperInfo}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

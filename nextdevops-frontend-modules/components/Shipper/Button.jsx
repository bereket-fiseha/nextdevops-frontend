import React from "react";
import { useRouter } from "next/router";
import { Button as Buttonn } from "@material-ui/core";

const handleShipperMovement = ({ shipperDetails, router }) => {
  shipperDetails && shipperDetails.firstName !== ""
    ? router.push("/Dashboard")
    : router.push("/shipper/shipperDash");
};
const Button = ({ buttonText, shipperDetails, isLoading }) => {
  const router = useRouter();

  return (
    <Buttonn
      onClick={() => handleShipperMovement({ shipperDetails, router })}
      disabled={isLoading}
      variant="contained"
      color="success"
      size="large"
      style={{
        backgroundColor: "#15e95c",
        marginTop: "80px",
        color: "white",
        fontSize: "1rem",
        fontWeight: "bold",
        width: "120px",
        height: "50px",
      }}
    >
      {buttonText}
    </Buttonn>
  );
};

export default Button;

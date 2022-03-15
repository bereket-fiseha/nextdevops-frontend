import React from "react";
import { useRouter } from "next/router";
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const handleCarrierMovement = ({ carrierDetails, router }) => {
  carrierDetails.firstName !== ""
    ? router.push("/Dashboard")
    : router.push("/carrier/carrierDash");
};
const ButtonCarrier = ({ carrierDetails }) => {
  const router = useRouter();
  const {t} = useTranslation();
  return (
    <div className="row shipper-button d-flex justify-content-center">
      <Button onClick={() => handleCarrierMovement({ carrierDetails, router })}>
        {t("continue")}
      </Button>
    </div>
  );
};

export default ButtonCarrier;

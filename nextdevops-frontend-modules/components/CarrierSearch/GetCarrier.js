import React, { useState } from "react";
import MediaCard from "./CarrierCard";
import Container from "@material-ui/core/Container";
import { useRouter } from 'next/router';
import style from '../../styles/Shipper.module.css';
import { useTranslation } from 'react-i18next';

const GetCarrier = (props) => {
  const {t} = useTranslation();
  const [location, setLocation] = useState({
    source: '',
    destination: ''
  })

  const [availableCarrier, setAvailableCarrier] = useState({});

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setLocation((prevalue) => {
      return {
        ...prevalue,
        [name]: value
      }
    })
  }
  const handleSearch = () => {
    props.getCarrierByLocation(location.source, location.destination).then(res => setAvailableCarrier(res))
  }

  const selectCarrier = carrierIds => {
    const router = useRouter();
    router.push('/ShipperPostLoad')
  }
  return (
    <Container maxWidth="sm">
      <div className={style.find_carrier}>
        {t("source")}
        <input type="text" name="source" onChange={handleChange} />
        {t("destination")}
        <input type="text" name="destination" onChange={handleChange} />
        <button onClick={handleSearch}>{t("search")}</button>
      </div>
      {availableCarrier.length > 0 && (
        <MediaCard
          carrierId={availableCarrier}
          selectedCarrierHandle={carrierIds => selectCarrier(carrierIds)}
        />
      )}
      {availableCarrier.length === 0 && <div>{t("no carrier found")}</div>}
    </Container>
  );
};

export default GetCarrier;

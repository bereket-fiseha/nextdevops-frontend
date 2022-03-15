import styles from "../styles/Header.module.css";
import { Row } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import HeaderButton from "./HeaderButton/HeaderButton";
import shipperButtonImage from "../image/shipperButton.svg";
import carrierButtonImage from "../image/carrierButton.svg";

const HeaderText = () => {
  const {t} = useTranslation();
  return (
    <div className={styles.bg_inner}>
      {/* <h1>{t('home header main text')}</h1> */}
      <h2>{t('home header sub text')}</h2>

      <Row xs={1} md={2} className="no-gutters text-center">
        <HeaderButton title={t('home header button 1')} imgUrl={shipperButtonImage} href='/shipper/ShipperLoginPage' />
        <HeaderButton title={t('home header button 2')} imgUrl={carrierButtonImage} href='/carrier/CarrierLoginPage' />
      </Row>
    </div>
  );
};

export default HeaderText;

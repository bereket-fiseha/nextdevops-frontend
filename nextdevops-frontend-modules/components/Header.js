import styles from "../styles/Header.module.css";
import { Col, Row } from "react-bootstrap";
import HeaderText from "./HeaderText";
import Slider from "./Slider";
import { setShipperDetailsFromLocalStorage, setShipperId } from "../redux/actions/shipperRegistration";
import { setCarrierDetailsFromLocalStorage, setCarrierId } from "../redux/actions/carrierRegistration";
import { useEffect } from "react";
import { connect } from "react-redux";

const Header = ({ shipperDetails, carrierDetails, setShipperDetailsFromLocalStorage, setCarrierDetailsFromLocalStorage, setShipperId, setCarrierId  }) => {
  //need to do for shipper too
  useEffect(() => {
    if (localStorage.getItem('shipperDetails')) {
      const shipperDetail = localStorage.getItem('shipperDetails');
      if(shipperDetail) {
        setShipperDetailsFromLocalStorage(JSON.parse(shipperDetail));
      } else {
        setShipperDetailsFromLocalStorage(shipperDetails);
      }
    } else {
      const carrierDetail = localStorage.getItem('carrierDetails');
      if(carrierDetail) {
        setCarrierDetailsFromLocalStorage(JSON.parse(carrierDetail));
      } else {
        setCarrierDetailsFromLocalStorage(carrierDetails);
      }
    }
  }, []);
  return (
     <div>
      <Row className="no-gutters text-center">
        <Col>
          <Slider />
        </Col>
      </Row>
      <Row>
        {shipperDetails.firstName || carrierDetails.firstName ? (
          <div></div>
        ) : (
          <HeaderText />
        )}
      </Row>
    </div>
  );
};

// fetch the state for carrier state as well
const mapStateToProps = (state) => {
  return {
    shipperDetails: state.shipperDetails.shipperInfo,
    carrierDetails: state.carrierDetails.carrierInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      setShipperDetailsFromLocalStorage: shipperDetails => setShipperDetailsFromLocalStorage(dispatch, shipperDetails),
      setShipperId: shipperId => setShipperId(dispatch, shipperId),
      setCarrierDetailsFromLocalStorage: carrierDetails => setCarrierDetailsFromLocalStorage(dispatch, carrierDetails),
      setCarrierId: carrierId => setCarrierId(dispatch, carrierId)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

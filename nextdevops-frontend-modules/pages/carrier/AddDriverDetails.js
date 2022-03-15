import React from "react";
import DriverDetails from "../../components/Carrier/DriverDetails";
import {
  postDriverDetails,
  setCarrierDetailsFromLocalStorage,
  setCarrierId
} from "../../redux/actions/carrierRegistration";
import { connect } from "react-redux";

const AddDriverDetails = props => {
  return <DriverDetails props={props} />;
};

const mapStateToProps = state => {
  return {
    carrierDetails: state.carrierDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postDriverDetails: (data, checkShipperRegistration) =>
      postDriverDetails(dispatch, data, checkShipperRegistration),
    setCarrierDetailsFromLocalStorage: data =>
      setCarrierDetailsFromLocalStorage(dispatch, data),
    setCarrierId: carrierId => setCarrierId(dispatch, carrierId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDriverDetails);

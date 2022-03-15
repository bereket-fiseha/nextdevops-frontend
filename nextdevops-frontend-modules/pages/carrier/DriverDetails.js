import React from "react";
import AllDrivers from "../../components/Carrier/Driver/AllDrivers";
import {
  getDriverDetails,
  setCarrierDetailsFromLocalStorage,
  setCarrierId,
} from "../../redux/actions/carrierRegistration";
import { connect } from "react-redux";

const GetDriverDetails = (props) => {
  return (
    <>
      <AllDrivers props={props} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    carrierDetails: state.carrierDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDriverDetails: (carrierId) => getDriverDetails(dispatch, carrierId),
    setCarrierDetailsFromLocalStorage: (data) =>
      setCarrierDetailsFromLocalStorage(dispatch, data),
    setCarrierId: (carrierId) => setCarrierId(dispatch, carrierId),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetDriverDetails);

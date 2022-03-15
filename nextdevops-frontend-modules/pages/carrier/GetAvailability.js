import React from "react";
import {
  getVehicleAvailability,
  setCarrierDetailsFromLocalStorage,
  setCarrierId,
} from "../../redux/actions/carrierRegistration";
import VehicleAvailability from "../../components/Carrier/VehicleAvailibility";
import { connect } from "react-redux";

const GetAvailability = (props) => {
  return <VehicleAvailability props={props} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCarrierDetailsFromLocalStorage: (data) =>
      setCarrierDetailsFromLocalStorage(dispatch, data),
    setCarrierId: (carrierId) => setCarrierId(dispatch, carrierId),
    getVehicleAvailability: (carrierId) =>
      getVehicleAvailability(dispatch, carrierId),
  };
};

export default connect(null, mapDispatchToProps)(GetAvailability);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AvailabilityForm from "../components/Availability/AvailabilityForm";
import FullPageLoader from "../components/Helper/FullPageLoader";
import { carrierPostVehicleAvailability, setCarrierDetailsFromLocalStorage, setCarrierId } from '../redux/actions/carrierRegistration';

const postAvailability = (props) => {
  const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const carrierDetails = localStorage.getItem('carrierDetails');
        if (carrierDetails) {
            setShowLoader(false)
            props.setCarrierDetailsFromLocalStorage(JSON.parse(carrierDetails));
            props.setCarrierId(carrierDetails.carrierId);
        }
    }, []);
    const { carrierAvailability, carrierDetails: { carrierInfo: { carrierId, carrierCompName } } } = props;
    return (
        <>
        {showLoader && <FullPageLoader />}
        <AvailabilityForm carrierPostVehicleAvailability={carrierPostVehicleAvailability} carrierId={carrierId} carrierName={carrierCompName}/>
        </>
    );
}

const mapStateToProps = state => {
    return {
        carrierDetails: state.carrierDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        carrierPostVehicleAvailability: (data) => carrierPostVehicleAvailability(data),
        setCarrierDetailsFromLocalStorage: carrierDetails => setCarrierDetailsFromLocalStorage(dispatch, carrierDetails),
        setCarrierId: carrierId => setCarrierId(dispatch, carrierId),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(postAvailability);
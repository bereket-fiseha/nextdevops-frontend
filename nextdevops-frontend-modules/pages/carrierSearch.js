import React from "react";
import { connect } from 'react-redux';
import GetCarrier from "../components/CarrierSearch/GetCarrier";
import { getCarrierByLocation } from '../redux/actions/shipperRegistration';

const carrierSearch = (props) => {
    return (
        <GetCarrier getCarrierByLocation={props.getCarrierByLocation}/>
    );
}

const mapStateToProps = state => {
    return {
        shipperDetails: state.shipperDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCarrierByLocation: (source, destination) => getCarrierByLocation(dispatch, source, destination)
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(carrierSearch);
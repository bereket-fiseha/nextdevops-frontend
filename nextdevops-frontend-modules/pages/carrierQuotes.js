import React from "react";
import { setShipperRequestQuotes } from "../redux/actions/shipperRegistration";
import {
  getReceievedQuotes,
  setCarrierDetailsFromLocalStorage,
  setCarrierId,
  carrierQuotesAction,
  getDriverDetails,
  assignDriverForQuote,
} from "../redux/actions/CarrierRegistration";
import { getProposalDetails } from "../redux/actions/ShipperRegistration";
import { connect } from "react-redux";
import CarrierQuote from "../components/CarrierQuoteItems/CarrierQuote";

const CarrierQuotes = (props) => {
  return <CarrierQuote props={props} />;
};

const mapStateToProps = (state) => {
  return {
    carrierDetails: state.carrierDetails,
    shipperDetails: state.shipperDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReceievedQuotes: (carrierId) => getReceievedQuotes(dispatch, carrierId),
    setShipperRequestQuotes: () => setShipperRequestQuotes,
    setCarrierDetailsFromLocalStorage: (carrierDetails) =>
      setCarrierDetailsFromLocalStorage(dispatch, carrierDetails),
    setCarrierId: (carrierId) => setCarrierId(dispatch, carrierId),
    carrierQuotesAction: (data) => carrierQuotesAction(dispatch, data),
    getProposalDetails: (proposalId) =>
      getProposalDetails(dispatch, proposalId),
    getDriverDetails: (carrierId) => getDriverDetails(dispatch, carrierId),
    assignDriverForQuote: (data) => assignDriverForQuote(dispatch, data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarrierQuotes);

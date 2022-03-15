import * as t from "../types";
import * as service from "../../pages/api/shipperRegistration";

export const setShipperDetails = (dispatch, data, checkShipperRegistration) => {
  service.storeShipperDetails(data, checkShipperRegistration);
  localStorage.setItem("shipperDetails", JSON.stringify(data));
  localStorage.setItem("shipperRegister", true);
  dispatch({
    type: t.SET_SHIPPER_DETAILS,
    payload: data
  });
};

export const setShipperDetailsFromLocalStorage = (dispatch, data) => {
  dispatch({
    type: t.SET_SHIPPER_DETAILS,
    payload: data,
    isLoading: false
  });
};

export const getShipperDetails = async (dispatch, shipperId, email) => {
  dispatch({
    type: t.SET_SHIPPER_DETAILS_REQUEST,
    isLoading: true
  });
  service.getShipperDetails(shipperId, email).then(data => {
    if (data.name === "Error") {
      dispatch({
        type: t.SET_ERROR,
        error: data.name,
        isLoading: false
      });
      dispatch({
        type: t.SET_SHIPPER_DETAILS_COMPLETED,
        isLoading: false
      });
    } else {
      localStorage.setItem("shipperDetails", JSON.stringify(data));
      dispatch({
        type: t.SET_SHIPPER_DETAILS,
        payload: data,
        isLoading: false
      });
    }
  });
};

export const setShipperId = (dispatch, shipperId) => {
  dispatch({
    type: t.SET_SHIPPER_ID,
    payload: shipperId
  });
};

export const setShipperRequestQuotes = data => {
  service.storeShipperRequestQuotes(data);
  return {
    type: t.SET_SHIPPER_REQUEST_QUOTES_DETAILS,
    payload: data
  };
};

export const getShipperReceievedQuotes = (dispatch, shipperId, from, till) =>
  service.getShipperReceievedQuotes(shipperId, from, till);

export const getProposalDetails = (dispatch, proposalId) => {
  return service.getProposalDetails(proposalId);
};

export const getCarrierByLocation = (dispatch, source, destination) => {
  return service.getCarrierByLocation(source, destination);
  // dispatch({
  //     type: t.GET_CARRIER_BY_LOCATION,
  //     payload: res
  // })
};

export const getProposalAcceptanceStatus = (
  dispatch,
  quoteId,
  status,
  role,
  comment,
  ts,
  carrierAcceptance,
  count
) => {
  const data = { quoteId, status, role, comment, ts, carrierAcceptance, count };
  return service.getProposalAcceptanceStatus(JSON.parse(JSON.stringify(data)));
};

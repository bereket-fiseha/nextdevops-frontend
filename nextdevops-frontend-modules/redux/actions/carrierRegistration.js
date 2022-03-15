import * as t from "../types";
import * as service from "../../pages/api/carrierRegistration";

export const setCarrierDetails = (dispatch, data, checkCarrierRegistration) => {
  service.storeCarrierDetails(data, checkCarrierRegistration);
  localStorage.setItem("carrierDetails", JSON.stringify(data));
  localStorage.setItem("carrierRegister", true);
  dispatch({
    type: t.SET_CARRIER_DETAILS,
    payload: data
  });
};

export const setCarrierDetailsFromLocalStorage = (dispatch, data) => {
  dispatch({
    type: t.SET_CARRIER_DETAILS,
    payload: data,
    isLoading: false
  });
};

export const getCarrierDetails = async (dispatch, carrierId, email) => {
  dispatch({
    type: t.SET_CARRIER_DETAILS_REQUEST,
    isLoading: true
  });
  service.getCarrierDetails(carrierId, email).then(data => {
    if (data.name === "Error") {
      dispatch({
        type: t.SET_ERROR,
        error: data.name,
        isLoading: false
      });
      dispatch({
        type: t.SET_CARRIER_DETAILS_COMPLETED,
        isLoading: false
      });
    } else {
      localStorage.setItem("carrierDetails", JSON.stringify(data));

      dispatch({
        type: t.SET_CARRIER_DETAILS,
        payload: data,
        isLoading: false
      });
    }
  });
};

export const setCarrierId = (dispatch, carrierId) => {
  dispatch({
    type: t.SET_CARRIER_ID,
    payload: carrierId
  });
};

export const getReceievedQuotes = (dispatch, carrierId) => {
  return service.getReceievedQuotes(carrierId);
};

export const carrierPostVehicleAvailability = data => {
  return service.carrierPostVehicleAvailability(data);
};

export const carrierQuotesAction = (dispatch, data) => {
  return service.sendCarrierQuotes(data);
};

export const postDriverDetails = (dispatch, data, checkShipperRegistration) => {
  return service.postDriverDetails(data, checkShipperRegistration);
};

export const getDriverDetails = (dispatch, carrierId) => {
  return service.getDriverDetails(carrierId);
};

export const assignDriverForQuote = (dispatch, data) => {
  return service.assignDriverForQuote(data);
};

export const getVehicleAvailability = (dispatch, carrierId) => {
  return service.getVehicleAvailability(carrierId);
};

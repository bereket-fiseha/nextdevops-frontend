import axios from "axios";
import config from "./config";

export const storeCarrierDetails = (reqData, checkCarrierRegistration) => {
  axios({
    method: "post",
    url: `${config.awsApiEndPoint}/v1/carrier`,
    data: reqData
  }).then(
    response => {
      if (response.status === 200) {
        checkCarrierRegistration(true);
      }
      return response;
    },
    error => {
      checkCarrierRegistration(false);
      return error;
    }
  );
};

export const getCarrierDetails = (carrierId, email) => {
  return axios
    .get(`${config.awsApiEndPoint}/v1/carrier/${carrierId}?email=${email}`)
    .then(
      response => response.data,
      error => error
    );
};

export const getReceievedQuotes = carrierId =>
  axios.get(`${config.awsAPIQuote}/v1/carrierquotes/${carrierId}`);

export const carrierPostVehicleAvailability = reqData => {
  return axios({
    method: "post",
    url: `${config.awsAPICarrierAvailability}/v1/availability`,
    data: reqData
  });
};
export const sendCarrierQuotes = reqData => {
  return axios({
    method: "post",
    url: `${config.awsAPIProposal}/v1/proposal`,
    data: reqData
  });
};

export const postDriverDetails = reqData => {
  return axios({
    method: "post",
    url: `${config.awsAPIDriverEndPoint}/v1/driver`,
    data: reqData
  });
};

export const getDriverDetails = carrierId => {
  return axios
    .get(`${config.awsAPIDriverEndPoint}/v1/carrier/driver/${carrierId}`)
    .then(
      response => response.data,
      error => error.toString()
    );
};

export const assignDriverForQuote = reqData => {
  return axios({
    method: "post",
    url: `${config.awsAPIDriverEndPoint}/v1/driver/allot`,
    data: reqData
  }).then(
    response => response,
    error => error
  );
};

export const getVehicleAvailability = carrierId => {
  return axios
    .get(`${config.awsAPICarrierAvailability}/v1/availability/${carrierId}`)
    .then(
      response => response.data,
      error => error.toString()
    );
};

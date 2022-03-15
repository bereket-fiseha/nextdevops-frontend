import axios from "axios";
import config from "./config";

export const storeShipperDetails = (reqData, checkShipperRegistration) => {
  axios({
    method: "post",
    url: `${config.awsApiEndPoint}/v1/shipper`,
    data: reqData
  }).then(
    response => {
      if (response.status === 200) {
        checkShipperRegistration(true);
      }
      return response;
    },
    error => {
      checkShipperRegistration(false);
      return error;
    }
  );
};

export const getShipperDetails = (shipperId, email) => {
  return axios
    .get(`${config.awsApiEndPoint}/v1/shipper/${shipperId}?email=${email}`)
    .then(
      response => {
        return response.data;
      },
      error => {
        return error;
      }
    );
};
export const getShipperReceievedQuotes = (shipperId, from, till) =>
  axios.get(
    `${config.awsAPIQuote}/v1/shipperquotes/${shipperId}?from=${from}&till=${till}`
  );

export const storeShipperRequestQuotes = reqData => {
  axios({
    method: "post",
    url: `${config.awsApiEndPointQuotes}/v1/quote`,
    data: reqData
  }).then(
    response => {
      return response;
    },
    error => {
      return error;
    }
  );
};

export const getCarrierByLocation = (source, destination) => {
  return axios
    .get(
      `${config.awsAPICarrierAvailability}/v1/availability?src=${source}&dest=${destination}`
    )
    .then(
      response => {
        return response.data;
      },
      error => {
        return error;
      }
    );
};

export const getProposalDetails = proposalId =>
  axios.get(
    `${config.awsAPICarrierQuotes}/v1/proposal?proposalId=${proposalId}`
  );

export const getProposalAcceptanceStatus = reqData => {
  return axios({
    method: "post",
    url: `${config.awsAPIQuoteStatus}/v1/quote/status`,
    data: reqData
  });
};

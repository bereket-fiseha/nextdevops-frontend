import axios from "axios";
import config from "./config";

export const getSingleQuoteDetails = (quoteId, setShowLoader) => {
  setShowLoader(true);
  return axios
    .get(`${config.awsApiEndPointQuotes}/v1/quote?quoteId=${quoteId}`)
    .then(
      (response) => {
        setShowLoader(false);
        return response.data;
      },
      (error) => {
        return error;
      }
    );
};

export const postAgentClaim = (data, checkPostAgentClaim, setShowLoader) => {
  setShowLoader(true);
  return axios({
    method: "post",
    url: `${config.awsAPILoadFactorAgent}/v1/loadfactor/claims`,
    data: data,
  }).then(
    (response) => {
      setShowLoader(false);
      checkPostAgentClaim(true);
      return response;
    },
    (error) => {
      checkPostAgentClaim(false);
      return error;
    }
  );
};

export const getSubmittedClaims = (loadfactorUserId) => {
  return axios
    .get(`${config.awsAPILoadFactorAgent}/v1/loadfactor/claims?userId=${loadfactorUserId}`)
    .then(
      (response) => {
        return response.data;
      },
      (error) => {
        return error;
      }
    );
}

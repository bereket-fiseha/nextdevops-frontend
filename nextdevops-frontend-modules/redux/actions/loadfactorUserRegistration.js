import * as t from "../types";
import * as service from "../../pages/api/loadfactorAgent";

export const setLoadFactorUserId = (dispatch, loadfactorUserId) => {
  dispatch({
    type: t.SET_LOADFACTOR_USER_ID,
    payload: loadfactorUserId,
  });
};

export const getSingleQuoteDetails = (dispatch, quoteId, setShowLoader) => {
  return service.getSingleQuoteDetails(quoteId, setShowLoader);
};

export const postAgentClaim = (dispatch, data, checkPostAgentClaim, setShowLoader) => {
  return service.postAgentClaim(data, checkPostAgentClaim, setShowLoader);
};

export const getSubmittedClaims = (dispatch, loadfactorUserId) => {
  return service.getSubmittedClaims(loadfactorUserId)
}

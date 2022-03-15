import * as t from "../types";
// import * as service from "../../pages/api/shipperRegistration";

export const setAdminId = (dispatch, adminUserId) => {
  dispatch({
    type: t.SET_ADMIN_USER_ID,
    payload: adminUserId,
  });
};
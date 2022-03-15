import * as service from "../../pages/api/tracking";

export const postTrackingStatus = (dispatch, data) =>
  service.postTrackingStatus(data);

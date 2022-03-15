import axios from "axios";
import config from "./config";

export const postTrackingStatus = (data) => {
  return axios({
    method: "post",
    url: `${config.awsAPITrackingPost}`,
    data,
  }).then(
    (response) => {
      return response;
    },
    (error) => {
      return error;
    }
  );
};

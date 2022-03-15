import axios from "axios";
import config from "./config";

export const postNotes = (reqData) => {
  return axios({
    method: "post",
    url: `${config.awsAPINote}/v1/notes`,
    data: reqData,
  });
};

export const getNotes = (quoteId, role) => {
  return axios.get(
    `${config.awsAPINote}/v1/notes?quoteId=${quoteId}&role=${role}`
  );
};

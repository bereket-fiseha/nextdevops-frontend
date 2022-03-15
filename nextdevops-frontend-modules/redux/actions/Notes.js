import * as service from "../../pages/api/notes";

export const postNotes = (data) => {
  return service.postNotes(data);
};

export const getNotes = (quoteId, role) => {
  return service.getNotes(quoteId, role);
};

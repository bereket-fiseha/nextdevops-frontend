import { combineReducers } from "redux";
import main from "./main";
import shipperRegistration from "./shipperRegistration";
import carrierRegistration from "./carrierRegistration";
import loadfactor from "./loadfactorUserRegistration";
import admin from './adminRegistration';
import errorHandle from "./error";

const rootReducer = combineReducers({
  main: main,
  shipperDetails: shipperRegistration,
  errorHandle: errorHandle,
  carrierDetails: carrierRegistration,
  loadfactorDetails: loadfactor,
  adminDetails: admin
});

export default rootReducer;

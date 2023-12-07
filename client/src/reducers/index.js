import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import sports from "./sports";
import tournament from "./tournament";

export default combineReducers({ alert, auth, sports, tournament });

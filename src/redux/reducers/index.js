import { combineReducers } from "redux";

import cases from "./casesReducer";
import vaccines from "./vaccinesReducer";
import auth from "./authReducer"


const RootReducer = combineReducers({
    cases,
    vaccines,
    auth
})


export default RootReducer;
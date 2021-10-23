import { combineReducers } from "redux";

import cases from "./casesReducer";
import vaccines from "./vaccinesReducer"


const RootReducer = combineReducers({
    cases,
    vaccines
})


export default RootReducer;
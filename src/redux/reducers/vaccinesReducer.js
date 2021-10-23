import {
    GET_ALL_VACCINES,
    GET_COUNTRY_VACCINE,
    GET_COUNTRY_VACCINE_PENDING,
    GET_VACCINE_PENDING,
    GET_VACCINE_FAILED }
from "../actions/vaccinesAction";

const initialState = {
  world: null,
  country:{},
  pending: false,
  failed:false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VACCINES:
      return {
        ...state,
        pending:false,
        failed:false,
        world: action.world
      }
    case GET_VACCINE_PENDING:
      return {
        ...state,
        pending:true
      };
    case GET_COUNTRY_VACCINE_PENDING:
        return {
            ...state,
            pending:true
          };

    case GET_VACCINE_FAILED:
        return {
          ...state,
          pending:false,
          failed:true,
        }
    case GET_COUNTRY_VACCINE:
        return{
            ...state,
            failed:false,
            pending:false,
            country:action.country
        }
    default:
      return state;
  }
};

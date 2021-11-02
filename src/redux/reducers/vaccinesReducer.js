import {
    GET_ALL_VACCINES,
    GET_COUNTRY_VACCINE,
    GET_COUNTRY_VACCINE_PENDING,
    GET_VACCINE_PENDING,
    GET_VACCINE_FAILED,
    CLEAR_SNACKBAR
}from "../actions/vaccinesAction";

const initialState = {
  worldCases: null,
  worldVaccination: null,
  countryCases:{}, 
  countryVaccination:{}, 
  pending: false,
  failed:false,
  snackBarMessage:{
    open:false,
    severity: '',
    message:""
}
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
          snackBarMessage:{
            open:true,
            severity: 'error',
            message:action.message
          }
        }
    case GET_COUNTRY_VACCINE:
        return{
            ...state,
            failed:false,
            pending:false,
            country:action.country
        }
    case CLEAR_SNACKBAR:
      return {
          ...state,
          failed:false,
          snackBarMessage: {
              open: false,
              severity: '',
              message: null
          }
      }
    default:
      return state;
  }
};

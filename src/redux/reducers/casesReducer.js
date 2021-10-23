import { 
    GET_ALL_CASES,
    GET_CASES_PENDING,
    GET_CASES_FAILED, 
    GET_COUNTRY_CASES, 
    GET_COUNTRY_CASES_PENDING
} from "../actions/casesAction";

const initialState = {
  world: [],
  country:{},
  pending: false,
  failed:false,
};

export default  (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CASES:
      return {
        ...state,
        pending:false,
        failed:false,
        world: action.world
      }
    case GET_CASES_PENDING:
      return {
        ...state,
        pending:true
      };
    case GET_COUNTRY_CASES_PENDING:
        return {
            ...state,
            pending:true
          };

    case GET_CASES_FAILED:
        return {
          ...state,
          pending:false,
          failed:true,
        }
    case GET_COUNTRY_CASES:
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

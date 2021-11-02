import { 
    SIGNUP_SUCCESS,
    LOGIN_SUCCESS,
    AUTH_PENDING,
    AUTH_FAILED,
    CLEAR_SNACKBAR,
    LOGOUT_SUCCESS,
    REST_PASSWORD_EMAIL,
    CREATE_NEW_PASSWORD
} from "../actions/authActions";

const initialState = {
  user:{},
  token:null,
  pending: false,
  error:false,
  snackBarMessage: {
    open: false,
    severity: '',
    message: null
}
};

export default  (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        pending:false,
        error:false,
        snackBarMessage:{
            open:true,
            severity: 'success',
            message:action.message
        }
      }
    case AUTH_PENDING:
      return {
        ...state,
        pending:true
      };
    case LOGIN_SUCCESS:
        return {
          ...state,
          pending:true,
          error:false,
          token:action.token,
          message:action.message
        };
    case LOGOUT_SUCCESS:
        return {
            ...state,
            pending:true,
            error:false,
            token:"",
            snackBarMessage:{
                open:true,
                severity: 'success',
                message:action.message
            },
            user:{}
          };

    case AUTH_FAILED:
        return {
          ...state,
          pending:false,
          error:true,
          snackBarMessage:{
            open:true,
            severity: 'error',
            message:action.message
        }
        }
    case REST_PASSWORD_EMAIL:
        return{
            ...state,
            pending:false,
            error:false,
            snackBarMessage:{
              open:true,
              severity: 'success',
              message:action.message
          }
        }
    case CREATE_NEW_PASSWORD:
        return{
            ...state,
            pending:false,
            error:false,
            snackBarMessage:{
              open:true,
              severity: 'success',
              message:action.message
          }
        }
    case CLEAR_SNACKBAR:
        return {
            ...state,
            error:false,
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

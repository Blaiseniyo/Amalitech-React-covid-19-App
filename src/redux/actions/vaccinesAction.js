import axios from 'axios';

export const GET_ALL_VACCINES = "GET_ALL_VACCINES";
export const GET_COUNTRY_VACCINE = "GET_COUNTRY_VACCINE";
export const GET_COUNTRY_VACCINE_PENDING = "GET_COUNTRY_VACCINE_PENDING";
export const GET_VACCINE_PENDING = "GET_VACCINE_PENDING";
export const GET_VACCINE_FAILED = "GET_VACCINE_FAILED";
export const CLEAR_SNACKBAR = "CLEAR_SNACKBAR";

export const getAllVaccine=() => dispatch => {
    dispatch({
        type: GET_VACCINE_PENDING
      })
  return axios.get(`${process.env.REACT_APP_API_URL}/vaccines`)
  .then(res=>{
    const vaccines = []
    for( let country in res.data){
        vaccines.push(res.data[country])
    }
    dispatch({
      type: GET_ALL_VACCINES,
      world:vaccines
    })
  })
  .catch(err => {
        dispatch({
          type:GET_VACCINE_FAILED
        })
      })
}

export const getCountryVaccine=(country)=>dispatch=>{
    dispatch({
        type: GET_COUNTRY_VACCINE_PENDING
      })
    return axios.get(`${process.env.REACT_APP_API_URL}/vaccines?country=${country}`)
    .then(res=>{
        if(res.data.All){
            const vaccines = res.data.All
            dispatch({
                type: GET_COUNTRY_VACCINE,
                country:vaccines
            })
        }else{
            dispatch({
                type:GET_VACCINE_FAILED,
                message:`COVID-19 Vaccination Data for ${country} are not available`
            })
        }
        
    })
    .catch(err => {
        dispatch({
            type:GET_VACCINE_FAILED,
            message:`COVID-19 Vaccination Data for ${country} are not available`
        })
    })
}

export const clearSnackbar = () => dispatch => {
    dispatch({
      type: CLEAR_SNACKBAR
    })
  }
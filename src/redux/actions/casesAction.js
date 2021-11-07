import axios from 'axios';

export const GET_ALL_CASES = "GET_ALL_CASES";
export const GET_COUNTRY_CASES = "GET_COUNTRY_CASES";
export const GET_COUNTRY_CASES_PENDING = "GET_COUNTRY_CASES_PENDING";
export const GET_CASES_PENDING = "GET_CASES_PENDING";
export const GET_CASES_FAILED = "GET_CASES_FAILED";
export const CLEAR_SNACKBAR = "CLEAR_SNACKBAR";
export const GET_ALL_VACCINES = "GET_ALL_VACCINES";
export const GET_COUNTRY_VACCINE = "GET_COUNTRY_VACCINE";
export const GET_COUNTRY_VACCINE_PENDING = "GET_COUNTRY_VACCINE_PENDING";
export const GET_VACCINE_PENDING = "GET_VACCINE_PENDING";
export const GET_VACCINE_FAILED = "GET_VACCINE_FAILED";
// export const CLEAR_SNACKBAR = "CLEAR_SNACKBAR";


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

export const getAllCases=() => dispatch => {
    dispatch({
        type: GET_CASES_PENDING
      })
  return axios.get(`${process.env.REACT_APP_API_URL}/cases`)
  .then(res=>{
    const cases = []
    for( let country in res.data){

        cases.push(res.data[country])
    }
    dispatch({
      type: GET_ALL_CASES,
      world:cases
    })
  })
  .catch(err => {
        dispatch({
          type:GET_CASES_FAILED,
          message:"Error happened"
        })
      })
}

export const getCountryCases=(country)=>dispatch=>{
    dispatch({
        type: GET_COUNTRY_CASES_PENDING
      })
    return axios.get(`${process.env.REACT_APP_API_URL}/cases?country=${country}`)
    .then(res=>{
        if(res.data.All){
            if(res.data.All.lat && res.data.All.long){
                const cases = res.data.All
                dispatch({
                    type: GET_COUNTRY_CASES,
                    country:cases
                })
            }else{
                const capital = res.data.All.capital_city?res.data.All.capital_city:res.data[Object.keys(res.data)[1]];
                let capital_city="";
                if(res.data[capital]){
                    capital_city = res.data[capital];
                }else{
                
                    capital_city= res.data[Object.keys(res.data)[1]];
                }
                let result = res.data.All;
                result["lat"] = capital_city.lat;
                result["long"] = capital_city.long
                console.log(result)
                dispatch({
                    type: GET_COUNTRY_CASES,
                    country:result
                })
            }
            
        }else{
            dispatch({
                type:GET_CASES_FAILED,
                message:`COVID-19 Cases data for ${country} are not available`
            })
        }
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type:GET_CASES_FAILED,
            message:`COVID-19 cases for ${country} are not available`
        })
    })
}

export const clearSnackbar = () => dispatch => {
    dispatch({
      type: CLEAR_SNACKBAR
    })
  }
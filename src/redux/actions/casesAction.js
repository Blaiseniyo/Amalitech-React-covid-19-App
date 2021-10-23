import axios from 'axios';

export const GET_ALL_CASES = "GET_ALL_CASES";
export const GET_COUNTRY_CASES = "GET_COUNTRY_CASES";
export const GET_COUNTRY_CASES_PENDING = "GET_COUNTRY_CASES_PENDING";
export const GET_CASES_PENDING = "GET_CASES_PENDING";
export const GET_CASES_FAILED = "GET_CASES_FAILED";

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
          type:GET_CASES_FAILED
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
                const capital = res.data.All.capital_city;
                console.log(capital)
                console.log(res.data)
                const capital_city = res.data[capital];
                let result = res.data.All;
                // console.log(capital_city)
                // for(let name in res.data.All){
                //     result[name] = res.data.All[name]
                // }
                //const num = [1,2,3,4,5,6,]
                //console.log(...num)
                result["lat"] = capital_city.lat;
                result["long"] = capital_city.long
                // console.log(result)
                dispatch({
                    type: GET_COUNTRY_CASES,
                    country:result
                })
            }
            
        }else{
            dispatch({
                type:GET_CASES_FAILED
            })
        }
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type:GET_CASES_FAILED
        })
    })
}
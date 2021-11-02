import React,{useEffect,useRef} from 'react';
import {useDispatch,useSelector} from "react-redux";
import { Typography, Grid, Snackbar, Slide } from '@material-ui/core';
import { getAllCases , getCountryCases, clearSnackbar, getCountryVaccine,getAllVaccine } from '../redux/actions/casesAction';
// import { getAllVaccine, getCountryVaccine } from "../redux/actions/vaccinesAction";
import FooterPending from "./footerPending";
import MuiAlert from '@material-ui/lab/Alert';
import Card from "./DataCard/Card"
import "../App.scss"

function Footer() {
    const dispatch = useDispatch();
    const cases = useSelector(state=> state.cases)
    // const vaccines = useSelector(state=> state.vaccines)
    const urlRef = useRef("https://flagpedia.net/data/flags/w580/rw.png")

    useEffect(()=>{
        // dispatch(getAllCases());
        dispatch(getCountryCases("Rwanda"));
        // dispatch(getAllVaccine());
        dispatch(getCountryVaccine("Rwanda"));
    },[])

    if(!cases.failed && cases.countryCases.abbreviation){
        const abr= cases.countryCases.abbreviation.toLowerCase()
        urlRef.current = `https://flagpedia.net/data/flags/w580/${abr}.png`
    }

    const transitionSnackbar = (props)=>{
        return <Slide {...props} direction ="right"/>;
    }
    
    const closeTimer= () =>{
        dispatch(clearSnackbar());
    }

    return (
        <>
        <Snackbar
              open={cases.snackBarMessage.open}
              onClose={closeTimer}
              autoHideDuration={4000}
              TransitionComponent={transitionSnackbar}
          >
              <MuiAlert
                  severity={cases.snackBarMessage.severity}
                  variant='filled'
                  elevation={6}
              >{cases.snackBarMessage.message}</MuiAlert>
          </Snackbar>
        {cases.pending?
            <FooterPending/>
            :
            <div
            className="footer"
            >
                <div className="container" >
                <div className="country-container">
                    <img src={urlRef.current} className="flag-container"/>
                    <Typography variant="h5">{cases.countryCases.country}</Typography>
                </div>
                <div >
                    <hr/>
                    <Grid  container spacing={4} >
                        <Grid item xs={12} sm={6} md={4} key={0}>
                                <Card name="CONFIRMED CASES" value={cases.countryCases.confirmed} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} key={1}>
                                <Card name="RECOVERED PEOPLE" value={cases.countryCases.recovered} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} key={2}>
                                <Card name="NUMBER OF DEATH" value={cases.countryCases.deaths} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} key={3}>
                                <Card name="ADMINISTERED DOSES" value={cases.countryVaccination?cases.countryVaccination.administered:0}  />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} key={4}>
                                <Card name="PARTIALLY VACCINETED" value={cases.countryVaccination?cases.countryVaccination.people_partially_vaccinated:0}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} key={5}>
                            <Card name="FULLY VACCINETED" value={cases.countryVaccination?cases.countryVaccination.people_vaccinated:0} />
                        </Grid>

                    </Grid>
                </div>
                </div>
            </div>
        }
        </>
    )
}

export default Footer;
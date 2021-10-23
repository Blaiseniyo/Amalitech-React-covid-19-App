import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import { Typography, Grid } from '@material-ui/core';
import { getAllCases , getCountryCases } from '../redux/actions/casesAction';
import { getAllVaccine, getCountryVaccine } from "../redux/actions/vaccinesAction"
import RwandaFlag from "../assets/rwanda.jpg"
import Card from "./DataCard/Card"
import "../App.scss"
// import './landingstyle.scss';
// import color from '../colors'

function Footer() {
    const dispatch = useDispatch();
    const cases = useSelector(state=> state.cases)
    const vaccines = useSelector(state=> state.vaccines)
    useEffect(()=>{
        dispatch(getAllCases());
        dispatch(getCountryCases("Rwanda"));
        dispatch(getAllVaccine());
        dispatch(getCountryVaccine("Rwanda"));
    },[])
    let url = "https://flagpedia.net/data/flags/w580/rw.png"
    if(!cases.failed && cases.country.abbreviation){
        const abr= cases.country.abbreviation.toLowerCase()
        url = `https://flagpedia.net/data/flags/w580/${abr}.png`
    }
    return (
        <div
        //className="container"
        className="footer" 
        // position="static"
        >
            <div className="container" >
            {cases.pending?null:
            <div className="country-container">
                <img src={url} className="flag-container"/>
                <Typography variant="h5">{cases.country.country}</Typography>
            </div>
            }
            <div >
                <hr/>
                <Grid  container spacing={4} >
                    <Grid item xs={8} sm={4} md={4} key={0}>
                            <Card name="Confirmed case" value={cases.country.confirmed} />
                    </Grid>
                    <Grid item xs={8} sm={4} md={4} key={1}>
                            <Card name="Recovered" value={cases.country.recovered} />
                    </Grid>
                    <Grid item xs={8} sm={4} md={4} key={2}>
                            <Card name="Death" value={cases.country.deaths} />
                    </Grid>
                    <Grid item xs={8} sm={4} md={4} key={3}>
                            <Card name="Administered Doses" value={vaccines.country?vaccines.country.administered:0}  />
                    </Grid>
                    <Grid item xs={8} sm={4} md={4} key={4}>
                            <Card name="Partially Vaccineted" value={vaccines.country?vaccines.country.people_partially_vaccinated:0}/>
                    </Grid>
                    <Grid item xs={8} sm={4} md={4} key={5}>
                        <Card name="Fully Vaccineted" value={vaccines.country?vaccines.country.people_vaccinated:0} />
                    </Grid>

                </Grid>
            </div>
            </div>
        
            
        </div>
    )
}

export default Footer;
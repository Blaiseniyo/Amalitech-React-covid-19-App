import React, {useEffect,useState} from 'react';
import {useDispatch,useSelector} from "react-redux";

import { useLocation } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getAllCases , getCountryCases } from '../redux/actions/casesAction';
import { getAllVaccine, getCountryVaccine } from "../redux/actions/vaccinesAction"
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from "leaflet";
import RwandaFlag from "../assets/rwanda.jpg"
import Card from "./DataCard/Card";
import "../App.scss"

const useStyles = makeStyles((theme) => ({
    element:{
        padding: theme.spacing(6, 1),
        flexGrow: 1,
        ...theme.mixins.toolbar,
    }
}))

const Landing= props =>{
    const dispatch = useDispatch();
    const cases = useSelector(state=> state.cases)
    const vaccines = useSelector(state=> state.vaccines)
    const [countrySearch,setCountrySearch]= useState(null);
    const [activeCountry,setActiveCountry]= useState(null);
    useEffect(()=>{
        dispatch(getAllCases());
        dispatch(getCountryCases("Rwanda"));
        dispatch(getAllVaccine());
        dispatch(getCountryVaccine("Rwanda"));
    },[])
    useEffect(()=>{
        //dispatch(getAllCases());
       // dispatch(getCountryCases("Rwanda"));
    },[])
    const handleClick=(e)=>{
        const value = e.target.value;
        setCountrySearch(value)
    }
    const position = [parseInt(cases.country.lat), parseInt(cases.country.long)]
    return (
        <div
        // className="container result"
        >
            {/* <div className="country-container">
                <img src={RwandaFlag} className="flag-container"/>
                <Typography variant="h4" className="country">Rwanda</Typography>
            </div> */}
            {/* <Grid  container item spacing={4} >
                    <Grid item xs={8} sm={4} md={4} key={0} className={classes.insideGrid,classes.separate}>
                        <Card name="Confirmed case" value="17290" />
                    </Grid>
                    <Grid item xs={8} sm={4} md={4} key={1} className={classes.insideGrid,classes.separate}>
                        <Card name="Recovered" value="17290" />
                    </Grid>
                    <Grid item xs={8} sm={4} md={4} key={2} className={classes.insideGrid,classes.separate}>
                        <Card name="Death" value="17290" />
                    </Grid>
                    <Grid item xs={8} sm={4} md={4} key={3} className={classes.insideGrid,classes.separate}>
                        <Card name="Administered Doses" value="17290"  />
                    </Grid>
                    <Grid item xs={8} sm={4} md={4} key={4} className={classes.insideGrid,classes.separate}>
                        <Card name="Partially Vaccineted" value="17290"/>
                    </Grid>
                    <Grid item xs={8} sm={4} md={4} key={5} className={classes.insideGrid,classes.separate}>
                        <Card name="Fully Vaccineted" value="17290" />
                    </Grid>
            </Grid> */}
            {cases.pending? 
                <Map center={[-1.9403,29.8739]} zoom={2}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </Map>
            :
             <Map center={[cases.country.lat?parseInt(cases.country.lat):-1.9403, cases.country.long? parseInt(cases.country.long):29.8739]} zoom={2}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* {cases.world.map((country,index)=>{
                    {console.log(country)} */}
                    <Marker key={"oooioi"} position={position} onclick={()=>{
                        // setActiveCountry(country)
                    }}>
                    
                    <Popup position={position}>
                        <h2>{`Country: ${cases.country.country}`}</h2>
                        <h2>{`Capital: ${cases.country.capital_city}`}</h2>
                        <h2>{`Area: ${cases.country.sq_km_area}(Km^2)`}</h2>
                        <h2>{`Total Population: ${cases.country.population}`}</h2>
                        <h2>{`Life Expectancy: ${cases.country.life_expectancy}`}</h2>
                    </Popup>

                    </Marker>
                {/* })} */}
                {/* {activeCountry && <Popup position={[parseInt(activeCountry.lat),parseInt(activeCountry.long)]} /> } */}
            </Map>
            }
        </div>
    )
}

export default Landing

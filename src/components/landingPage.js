import React, {useRef} from 'react';
import {useSelector} from "react-redux";
import { Typography} from '@material-ui/core';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "../App.scss"

const Landing= props =>{
    const cases = useSelector(state=> state.cases)
    const position = useRef([-1.9403,29.8739])
    
    if(cases.country.lat && cases.country.long ) position.current = [parseFloat(cases.country.lat), parseFloat(cases.country.long)]
    return (
        <div>
            {cases.pending? 
                <Map center={position.current} zoom={4}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </Map>
            :
             <Map center={position.current} zoom={4}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                    <Marker key="maker" position={position.current}>
                        <Popup position={position.current}>
                            <Typography component="h2">{`Country:  ${cases.country.country}`}</Typography>
                            <Typography component="h2">{`Capital:  ${cases.country.capital_city}`}</Typography>
                            <Typography component="h2">{`Area:  ${cases.country.sq_km_area}(Km^2)`}</Typography>
                            <Typography component="h2">{`Total Population:  ${cases.country.population}`}</Typography>
                            <Typography component="h2">{`Life Expectancy:  ${cases.country.life_expectancy} years`}</Typography>
                        </Popup>
                    </Marker>
            </Map>
            }
        </div>
    )
}

export default Landing

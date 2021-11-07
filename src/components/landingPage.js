import React, {useRef} from 'react';
import {useSelector} from "react-redux";
import { Typography} from '@material-ui/core';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "../App.scss"

const Landing= props =>{
    const cases = useSelector(state=> state.cases)
    const position = useRef([-1.9403,29.8739])
    
    if(cases.countryCases.lat && cases.countryCases.long ) position.current = [parseFloat(cases.countryCases.lat), parseFloat(cases.countryCases.long)]
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
                            <Typography variant="subtitle2">{`Country:  ${cases.countryCases.country}`}</Typography>
                            <Typography variant="subtitle2">{`Capital:  ${cases.countryCases.capital_city}`}</Typography>
                            <Typography variant="subtitle2">{`Area:  ${cases.countryCases.sq_km_area}(Km^2)`}</Typography>
                            <Typography variant="subtitle2">{`Total Population:  ${cases.countryCases.population}`}</Typography>
                            <Typography variant="subtitle2">{`Life Expectancy:  ${cases.countryCases.life_expectancy} years`}</Typography>
                        </Popup>
                    </Marker>
            </Map>
            }
        </div>
    )
}

export default Landing

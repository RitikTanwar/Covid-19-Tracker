import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';
import './map.css'

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 600,
    },
    active: {
        hex: "#0000FF",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 600,
    },
    deaths: {
        hex: "#696969",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 2000,
    },
};


export const sortData = data => {
    const sortedData = [...data];
    // sortedData.sort((a, b) => {
    //     if (a.cases > b.cases) return -1;
    //     else return 1;
    // })
    // return sortedData;

    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1);
}
// Drawing Circles in the map
export const showDataOnMap = (data, casesType = 'cases') =>
    data.map(country => (
        <Circle
            center={country === 'worldWide' ? [34, 70] : [country.countryInfo.lat, country.countryInfo.long]}
            // center={}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="info-container">
                    <div
                        className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    />
                    <div className="info-name"><h2>{country.country}</h2></div>
                    <div className="info-confirmed">
                        Cases: {numeral(country.cases).format("0,0")}
                    </div>
                    <div className="info-active">
                        Active: {numeral(country.active).format("0,0")}
                    </div>
                    <div className="info-recovered">
                        Recovered: {numeral(country.recovered).format("0,0")}
                    </div>
                    <div className="info-deaths">
                        Deaths: {numeral(country.deaths).format("0,0")}
                    </div>
                    {/* <div className="info-deaths">
                        coordinates: {country.countryInfo.lat},{country.countryInfo.long}
                    </div> */}
                </div>
            </Popup>
        </Circle>
    ))
// console.log(Circle);
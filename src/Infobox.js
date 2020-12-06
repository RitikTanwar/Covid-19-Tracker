import React from 'react';
// import { Card, CardContent, Typography } from "@material-ui/core"
// import { green, purple } from '@material-ui/core/colors';
import "./infoBox.css";
import numeral from 'numeral';

function Infobox({ title, cases, total, boxcolor, ...props }) {
    const mystlye = {
        color: boxcolor,
    }
    return (
        <div onClick={props.onClick}>
            <div className="infoBox" id={boxcolor === 'rgb(0, 255, 13)' ? 'green' : boxcolor}>
                {/* Title */}
                <h4 className="infoBox_title" style={mystlye}>{title}</h4>
                {/* No. of cases */}
                <p className="infoBox_cases" style={mystlye} >{title === 'Active' ? "💙" : cases === 0 ? title === 'Confirmed' ? '❤️' : title === 'Recovered' ? '💚' : '🖤' : `+${numeral(cases).format(0, 0)}`} </p>
                {/* Total */}
                <h2 className="infoBox_total" style={mystlye}>{numeral(total).format(0, 0)}</h2>
            </div>
        </div>
    )
}

export default Infobox

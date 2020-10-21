import React from 'react';
import numeral from 'numeral';
import './Table.css';

function Table({ countries }) {
    // let progress = document.getElementById("progressbar");
    // let totalHeight = document.body.scrollHeight - window.innerHeight;
    // window.onscroll = function () {
    //     let progrssHeight = (window.pageYOffset / totalHeight) * 100;
    //     progress.style.height = progrssHeight + "%";
    // }
    return (
        <div className="table">
            {/* <div id="progressbar"></div>
            <div id="scrollpath"></div> */}
            <tr className="table_heading">
                <th>Country</th>
                <th>Total cases</th>
                {/* <th>Total Deaths</th>
                <th>Recoveries</th> */}
            </tr>
            <td></td>
            <td></td>
            {countries.map(({ country, cases, deaths, recovered }) => (
                <tr>
                    <td>{country}</td>
                    <td>{numeral(cases).format(0, 0)}</td>
                    {/* <td>{deaths}</td>
                    <td>{recovered}</td> */}
                </tr>
            ))}
        </div>
    )
}

export default Table

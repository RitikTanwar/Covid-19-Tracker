import React from 'react';
import numeral from 'numeral';
import './Table.css';

function Table({ countries }) {
    // Scrool bar
    // let totalHeight = document.body.scrollHeight - window.innerHeight;
    // let progress = document.querySelector("#progressbar");
    // window.onscroll = function () {
    //     let progressHeight = (window.pageYOffset / totalHeight) * 100;
    //     progress.style.height = progressHeight + "%";
    // }
    return (
        <div className="table">
            <table>
                <div id="progressbar"></div>
                <div id="scrollpath"></div>
                <tr className="table_heading">
                    <th >Country</th>
                    <th >Total Cases</th>
                    <th >Today's Cases</th>
                    <th >Total Deaths</th>
                    <th >Today's Deaths</th>
                    <th >Recoveries</th>
                    <th >Today's Recoveries</th>
                    <th >Active Cases</th>
                    <th >Total Tests</th>
                </tr>
                <td></td>
                <td></td>
                {countries.map(({ country, cases, deaths, recovered, todayCases, todayDeaths, todayRecovered, active, tests }) => (
                    <tr class="table_row">
                        <td class="table_column">{country}</td>
                        <td class="table_column">{numeral(cases).format(0, 0)}</td>
                        <td class="table_column">{numeral(todayCases).format(0, 0)}</td>
                        <td class="table_column">{numeral(deaths).format(0, 0)}</td>
                        <td class="table_column">{numeral(todayDeaths).format(0, 0)}</td>
                        <td class="table_column">{numeral(recovered).format(0, 0)}</td>
                        <td class="table_column">{numeral(todayRecovered).format(0, 0)}</td>
                        <td class="table_column">{numeral(active).format(0, 0)}</td>
                        <td class="table_column">{numeral(tests).format(0, 0)}</td>
                    </tr>

                ))}
            </table>
        </div>
    )
}

export default Table

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from "numeral";

// const color = {
//     'cases': 'red',
//     'recovered': 'green',
//     'deaths': 'grey',
//     'active': 'blue'
// }

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};
const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataCases;
    for (let date in data.cases) {
        if (lastDataCases) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataCases,
            };
            chartData.push(newDataPoint);
        };
        lastDataCases = data[casesType][date];
    }
    // console.log(chartData);
    return chartData;
}

function LineGraph({ casesType, color }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=250")
                .then((response) => response.json())
                .then((data) => {
                    let chartData = buildChartData(data, casesType);
                    // console.log(data);
                    // console.log(chartData);
                    setData(chartData);
                });
        };
        fetchData();
    }, [casesType]);
    // console.log(col)

    return (
        <div>
            {data?.length > 0 && (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: color,
                                // borderColor: 'rgb(2, 226, 51)',
                                data: data,
                            },
                        ],
                    }}
                />
            )}
        </div>
    )
}

export default LineGraph

// import { FormControl } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
// import useState
import { FormControl, Select, MenuItem, Card, CardContent, colors } from "@material-ui/core";
import './App.css';
import InfoBox from "./Infobox";
import Map from "./Map";
import Table from "./Table"
import { sortData } from "./helper";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldWide')
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: 70 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([])
  const [casesTypes, setCasesType] = useState('cases');

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso3,
              id: country.countryInfo._id
            }
          ));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        })
    }

    getCountriesData();

  }, [countries])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log(countryCode);
    setCountry(countryCode);
    const url = countryCode === 'worldWide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then((response) => response.json())
      .then(data => {
        if (countryCode !== 'worldWide') {
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        }
        else {
          setCountryInfo(data);
          setMapCenter([34.80746, 70]);
          setMapZoom(3);
        }
      })
  }

  return (
    <div className="app">
      <div className="up">
        <div className="app_left">
          <div className="app_header">
            <h1>COVID 19 TRACKER</h1>
            <FormControl className="app_dropdown">
              <Select variant="outlined" onChange={onCountryChange} value={country}>
                <MenuItem value='worldWide'>Worldwide</MenuItem>
                {countries.map((country) => (
                  < MenuItem value={country.value} > { country.name}</MenuItem>
                ))}
                {/* key={country.id} */}
              </Select>
            </FormControl>
          </div>
          <div className="app_stats">
            {/* Info boxes */}
            <InfoBox onClick={e => setCasesType('cases')} boxcolor="red" title="Confirmed" cases={countryInfo.todayCases} total={countryInfo.cases} />
            {/* Info Box */}
            <InfoBox onClick={e => setCasesType('active')} boxcolor="blue" title="Active" total={countryInfo.active} />
            {/* Info boxes */}
            <InfoBox onClick={e => setCasesType('recovered')} boxcolor="rgb(0, 255, 13)" title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
            {/* Info boxes */}
            <InfoBox onClick={e => setCasesType('deaths')} boxcolor="grey" title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
            {/* Info Box
          <InfoBox title="Test" cases={countryInfo.tests} total={countryInfo.testsPerOneMillion} /> */}
            {/* Map */}
          </div>
          <Map
            countries={mapCountries}
            casesType={casesTypes}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
        <Card className="app_right">
          {/* Graph */}
          <h1>Worldwide Cases</h1>
          <LineGraph casesType='cases' color="red" />
          <hr></hr>
          <hr></hr>
          <h1>Worldwide Recoveries</h1>
          <LineGraph casesType='recovered' color="green" />
          <hr></hr>
          <hr></hr>
          <h1>Worldwide Deaths</h1>
          <LineGraph casesType='deaths' color="gray" />
        </Card >
      </div>
      <div className="down">
        <h1 class="table_title">Live cases by country</h1>
        <Table countries={tableData} />
      </div>
    </div>
  );
}

export default App;

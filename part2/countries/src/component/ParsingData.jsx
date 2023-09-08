import React, { useEffect, useState } from "react";
import axios from "axios";
import Results from "./Results";
import Weather from "./Weather";

function ParsingData({ dataReceived, incomingData }) {
  const [countryData, setCountryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        let api_key = "2df74a07c1c74f781110f427757ae972";
        const response = await axios.get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${countryData.capital}`
        );
        const data = response.data;
        setWeatherData(data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data (Weather API):", error);
      }
    }
    fetchData()
  },[countryData.capital]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/all/`
        );
        const namesArray = response.data.map((obj) => obj.name.common);
        incomingData(namesArray);
      } catch (error) {
        console.error("Error fetching data 1:", error);
      }
    }

    if (countryData.capital) {
      fetchData();
    }
  }, [countryData.capital]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${dataReceived}`
        );
        const data = response.data;
        setCountryData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data 2:", error);
      }
    }

    fetchData();
  }, [dataReceived]);

  return (
    <div>
      <Results countryData={countryData} loading={loading} />
      <Weather weatherData={weatherData} />
    </div>
  );
}

export default ParsingData;

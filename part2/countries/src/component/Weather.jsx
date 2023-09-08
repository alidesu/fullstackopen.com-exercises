import React from "react";

const Weather = ({ weatherData }) => {
  const { location, current } = weatherData;

  if (!weatherData || !weatherData.location || !weatherData.current) {
    // If weatherData, location, or current is missing or undefined, return null or a loading message
    return <div></div>;
  }

  return (
    <div>
      <h2>
        Weather in {location.name}, {location.country}
      </h2>
      <p><strong>Temperature:</strong> {current.temperature}°C</p>
      <p><strong>Weather: </strong>{current.weather_descriptions[0]}</p>
      <p>
        <strong>Wind:</strong> {current.wind_speed} km/h, {current.wind_dir}
      </p>
    </div>
  );
};

export default Weather;

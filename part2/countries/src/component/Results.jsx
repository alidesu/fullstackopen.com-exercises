import React from "react";

const Results = ({ countryData, loading }) => {
  return (
    <div>
      <h2>Country Information</h2>
      {loading ? (
        <p>Write country name in search bar!</p>
      ) : (
        <div>
          <h3>Name: {countryData.name.common}</h3>
          <p><strong>Official Name:</strong> {countryData.name.official}</p>
          <p><strong>Region:</strong> {countryData.region}</p>
          <p><strong>Subregion:</strong> {countryData.subregion}</p>
          <p><strong>Capital: </strong> {countryData.capital}</p>
          <ul>
            {Object.values(countryData.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <p><strong>Is Landlocked:</strong> {countryData.landlocked ? "Yes" : "No"}</p>
          <p><strong>Population:</strong> {countryData.population}</p>
          <p><strong>Continent:</strong> {countryData.continents}</p>
          <div className="top-header">
          <p><strong>Official Flags:</strong></p>
          <img src={countryData.flags.svg} alt={`Flag of ${countryData.name.common}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;

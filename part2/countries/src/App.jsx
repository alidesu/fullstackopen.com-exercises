import React, { useEffect, useState } from "react";
import ParsingData from "./component/parsingData";

const App = () => {
  const [dataReceived, setDataReceived] = useState("");
  const [searchCountry, setSearchCountry] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [shoower, setShoower] = useState(true)

  const incomingData = (newData) => {
    setSearchCountry(newData);
  };

  const onChangeHandler = (event) => {
    let temp = event.target.value;
    setDataReceived(temp);
    setSearchTerm(temp);
    setShoower(true)
  };

  const isListVisible = searchTerm.length > 0;

  const filteredNames = isListVisible
    ? searchCountry.filter((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const isTooManyMatches = filteredNames.length > 10;

  const handleShowButtonClick = (name, event) => {
    event.preventDefault();
    setSelectedCountry(name);
    setShoower(false)
  };

  

  return (
    <div>
      <form>
        <label htmlFor="text">
          <strong>Find Countries: </strong>
        </label>
        <input type="text" onChange={onChangeHandler} placeholder="Search..." />
        {isTooManyMatches ? (
          <p>Too many matches, specify more filters</p>
        ) : (
          isListVisible && (
            <ul>
              {filteredNames.map((name, index) => (
                <div className="flex" key={index}>
                  <li>{name}</li>
                  <button
                    onClick={(event) => handleShowButtonClick(name, event)}
                  >
                    show
                  </button>
                </div>
              ))}
            </ul>
          )
        )}
      </form>

      {shoower ? (
        <ParsingData dataReceived={dataReceived} incomingData={incomingData} />
      ) : (
        selectedCountry && (
          <ParsingData
            dataReceived={selectedCountry}
            incomingData={incomingData}
          />
        )
      )}
    </div>
  );
};

export default App;

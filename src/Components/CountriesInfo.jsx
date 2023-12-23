import React, { useState } from "react";
import "./CountriesInfo.css";
import axios from "axios"; 

function CountriesInfo() {
  // These are the variables to be declaired to store the datas ... 
  const [inputValue, setInputValue] = useState(""); // This variable hold datas that is written in the input field.
  const [officialName , setOfficialName] = useState('') // This holds the official names of the countries that arrives after the data is fetched. 
  const [Area , setArea ] = useState('')  // This holds the area value 
  const [capital ,setCapital] = useState('') // This holds the capital of a country
  const [message, setMessage] = useState(""); // This holds the message to be displayed for the status of fetch
  const [Continent, setContinent] = useState(""); // This holds the continent value 
  const [Language, setLanguage] = useState(""); // This holds the language 
  const [Currency, setCurrency] = useState(""); // This holds the currency used in the country.


  // This function is executed when user press "enter key on the input field"
  const CheckKey = (e) => {
    if (e.key === "Enter") {
      fetchdata();
    }
  };

  // This is a function that fetch the countries info when called. It uses axios to fetch the data.
  const fetchdata = async () => {
    try {
      setMessage("Here is some information about " + inputValue);
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${inputValue}`
      );

      const countryData = response.data[0];

      setOfficialName(countryData.altSpellings[1])
      setInputValue(countryData.name.common);
      setLanguage(Object.keys(countryData.languages)[0] ?? "Not Available");
      setCurrency(Object.keys(countryData.currencies)[0] ?? "Not Available");
      setArea(countryData.area ?? "Not Available");
      setCapital(countryData.capital[0] ?? "Not Available");
      setContinent(countryData.region ?? "Not Available");

    } 
    catch (error) {
      setMessage("Sorry, the searched location doesn't exist");
      setArea('');
      setLanguage('');
      setCurrency('');
      setCapital('');
      setContinent('');
      setOfficialName('')
      setInputValue('')
    }
  };

  return (
    // This is a jsx form .... 
    <>
      <div className="mainContainer">
        <input
          id="inputfield"
          placeholder="Enter the name of a country"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={CheckKey}
        />
      </div>
      <div className="subContainer">
        <p className="paraInfo" >{message}</p>
        <p>{officialName}</p>
        <p className="paraInfo" > Area : {Area} sq.km </p>
        <p className="paraInfo" >Spoken Language : {Language}</p>
        <p className="paraInfo" >Capital City : {capital}</p>
        <p className="paraInfo" >Continent : {Continent}</p>
         <p className="paraInfo" >Currency : {Currency}</p>
      </div>
    </>
  );
}

export default CountriesInfo;

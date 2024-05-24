import { useState, useEffect } from "react";
import cities from './cities.json';
import useLatLon from "../useLatLon";

const CityForm = () => {
  const citiesList = cities.cities;
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity,setSelectedCity] = useState("")
  const { latitude,longitude, setLatLon } = useLatLon("")

  const handleInput = (e) => {
    let userInput = e.target.value;
    setInput(userInput);

    if (userInput.length >= 3) {
      const filteredSuggestions = citiesList.filter(city =>
        city.city_code.toLowerCase().startsWith(userInput.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city) => {
    console.log(city);
    setSelectedCity(city);
    setInput(city.city_code);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with selectedCity
    console.log(selectedCity);
    setLatLon(selectedCity.city_code);
    // Reset the input form
    setInput("");
  };

  useEffect(() => {
    console.log(latitude,longitude);
  }, [latitude,longitude]);

  return(
    
    <form className="w-full max-w-xs mx-auto" onSubmit={handleSubmit}>
      <h1>Exemple of an autocompletion with french city</h1>
      <input 
        type="text" 
        value={input} 
        onChange={handleInput} 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {suggestions.length > 0 && (
        <ul className="mt-2 bg-white shadow rounded">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index}
              className="border-b last:border-b-0 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.city_code}
            </li>
          ))}
        </ul>
      )}
      <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </form>

  )
}

export default CityForm
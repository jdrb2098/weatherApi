import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const iconsList = [
  "01n@4x.png",
  "02n@4x.png",
  "03n@4x.png",
  "04n@4x.png",
  "09n@4x.png",
  "10n@4x.png",
  "11n@4x.png",
  "13n@4x.png",
  "50n@4x.png",
];

function App() {
  const [latLon, setLatLon] = useState();
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState("Celcius");

  let weatherIcon = iconsList[8];
  switch (weather?.weather[0].description) {
    case "clear sky":
      weatherIcon = iconsList[0];
      break;

    case "few clouds":
      weatherIcon = iconsList[1];
      break;

    case "scattered clouds":
      weatherIcon = iconsList[2];
      break;

    case "broken clouds":
      weatherIcon = iconsList[3];
      break;

    case "shower rain":
      weatherIcon = iconsList[4];
      break;

    case "rain":
      weatherIcon = iconsList[5];
      break;

    case "thunderstorm":
      weatherIcon = iconsList[6];
      break;

    case "snow":
      weatherIcon = iconsList[7];
      break;

    case "mist":
      weatherIcon = iconsList[8];
      break;
  }

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      setLatLon({ lat, lon });
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (latLon !== undefined) {
      const API_KEY = "b709e6b93347071ae10b1cc0d6f2607e";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${API_KEY}`;

      axios
        .get(URL)
        .then((res) => setWeather(res.data))
        .catch((err) => console.log(err));
    }
  }, [latLon]);

  const units = () => {
    if (temperature == "Celcius") {
      setTemperature("Fahrenheit");
    } else {
      setTemperature("Celcius");
    }
  };
  console.log(weather);
  return (
    <div className="App">
      <div className="weather">
        <h1>Weather App</h1>
        <h2>Pais: '{weather?.sys.country}'</h2>
        <h3>Ciudad: {weather?.name}</h3>
        <div className="flex">
          <img src={`http://openweathermap.org/img/wn/${weatherIcon}`} />
          <div>
            <h3>{weather?.weather[0].description}</h3>
            <div className="flex" style={{justifyContent:'flex-start'}}>
              <i className="fa-solid fa-wind"></i>
              <h3>Wind speed: {weather?.wind.speed} m/s</h3>
            </div>
            <div className="flex" style={{justifyContent:'flex-start'}}>
              <i className="fa-solid fa-gauge"></i>
              <h3>Pressure: {weather?.main.pressure/100} mb</h3>
            </div>
            <div className="flex" style={{justifyContent:'flex-start'}}>
              <i className="fa-solid fa-cloud"></i>
              <h3>Clouds: {weather?.clouds.all} %</h3>
            </div>
          </div>
        </div>
        <div className="flex">
          <h2>
            {" "}
            Temperature:{" "}
            {temperature == "Celcius"
              ? (weather?.main.temp - 273.15).toFixed(1) + " °C"
              : (((weather?.main.temp - 273.15) * 9) / 5 + 32).toFixed(1) +
                " °F"}{" "}
          </h2>
          <button onClick={units}>
            {temperature == "Celcius" ? "Transform to °F" : "Tranform to °C"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

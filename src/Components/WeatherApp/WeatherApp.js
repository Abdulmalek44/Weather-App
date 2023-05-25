import React, { useState } from 'react'
import './WeatherApp.css'
import axios from 'axios'

const WeatherApp = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);

    const API_KEY = "a7fcac8366733a9625a60f9d497effb4";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;

    const handelCahnge = (e) => setCity(e.target.value)

    const handleSearch = () => {
        axios
            .get(`${API_URL}&q=${city}`)
            .then((response) => {
                setWeather(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("error");
                setLoading(false);
            })
    }
    return (
        <div className="weather-app">
            <div className="search-form">
                <input
                    type='text'
                    value={city}
                    onChange={handelCahnge}
                    placeholder='Enter city name'
                />
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? "Loading..." : "Search"}
                </button>
            </div>

            {weather && (
                <div className="weather-info">
                    <div className="location">
                        <h2>{weather.name}</h2>
                    </div>
                    <div className="temperature">
                        <p className="temp">{Math.round(weather.main.temp)}&#8457;</p>
                        <p className="description">{weather.weather[0].description}</p>
                    </div>
                    <div className="main-weather">
                        <p>{weather.main.feels_like}&#8457;  Feels_like </p>
                        <p>{weather.main.humidity}%   Humidity</p>
                        <p>{weather.wind.speed}MPH   Winds</p>
                        {console.log(weather)}
                    </div>
                </div>
            )}
        </div>
    )
}

export default WeatherApp

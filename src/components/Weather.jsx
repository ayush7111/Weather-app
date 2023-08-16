import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/weatherSlice";
import { toggleUnit } from "../store/weatherSlice";

const Weather = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);
  const unit = useSelector((state) => state.weather.unit);

  const handleSearch = () => {
    dispatch(fetchWeather(city));
    console.log(data);
    setCity("");
  };
  const handleToggleUnit = () => {
    dispatch(toggleUnit());
  };

  return (
    <>
      <div
        className="flex
       justify-center text-5xl font-extrabold"
      >
        Weather Search
      </div>
      <div className="max-w-sm mx-auto mt-8 p-4 rounded-lg shadow-md bg-blue-200">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none "
        >
          Get Weather
        </button>
        {loading && (
          <p className="mt-4 text-center text-gray-500">Loading...</p>
        )}
        {error && (
          <p className="mt-4 text-center text-red-500">
            {error.includes("404")
              ? "City not found."
              : "An error occurred. Please try again later."}
          </p>
        )}
        {data && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">{data.name}</h2>
            <p className="text-gray-500">{data.weather[0].description}</p>
            <div className="flex items-center justify-center mt-2">
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt="Weather Icon"
              />
              <p className="text-blue-600 text-lg ml-2">
                {unit === "C"
                  ? data.main.temp
                  : (data.main.temp * 1.8 + 32).toFixed(2)}
                °{unit}
              </p>
            </div>
            <p className="text-gray-500">
              Min:
              {unit === "C"
                ? data.main.temp_min
                : (data.main.temp_min * 1.8 + 32).toFixed(2)}
              °{unit} | Max:
              {unit === "C"
                ? data.main.temp_max
                : (data.main.temp_max * 1.8 + 32).toFixed(2)}
              °{unit}
              {/* Min: {data.main.temp_min}°C | Max: {data.main.temp_max}°C */}
            </p>
            <p className="text-gray-500">Humidity: {data.main.humidity}%</p>
            <button
              onClick={handleToggleUnit}
              className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none "
            >
              {unit === "C" ? "Switch to Fahrenheit" : "Switch to Celsius"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Weather;

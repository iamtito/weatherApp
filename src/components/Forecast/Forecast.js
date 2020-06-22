import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';
const Forecast = () => {
    
    let [responseObj, setResponseObj] = useState({});
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    // const uriEncodedCity = encodeURIComponent(city);

    function getForecast(e) {
        e.preventDefault();
        if (city.length === 0) {
            return setError(true);
        }
        // Clear state in preparation for new data
        setError(false);
        setResponseObj({});
        
        setLoading(true);

        let uriEncodedCity = encodeURIComponent(city);

        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_API_KEY,
                "access-control-allow-origin": "*"
            }
        })

        .then(response => response.json())
        .then(response => {
            // console.log(response);
            if (response.cod !== 200) {
                throw new Error()
            }
            setResponseObj(response);
            setLoading(false);
        })
        .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err);
        });
   }

   return (
    <div>
        <h2>Enter City Name</h2>
        <form onSubmit={getForecast}>
            <input
                type="text"
                placeholder="Enter City"
                maxLength="50"
                className={classes.textInput}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />
            <label className={classes.Radio}>
                <input
                    type="radio"
                    name="units"
                    checked={unit === "imperial"}
                    value="imperial"
                    onChange={(e) => setUnit(e.target.value)}
                    />
                Fahrenheit
            </label>
            <label className={classes.Radio} >
                <input
                    type="radio"
                    name="units"
                    checked={unit === "metric"}
                    value="metric"
                    onChange={(e) => setUnit(e.target.value)}
                    />
                Celcius
            </label>
            <button className={classes.Button} type="submit">Get Forecast</button>
        </form>
        <Conditions
              responseObj={responseObj}
              error={error} 
              loading={loading} 
              />
    </div>
   )
}

export default Forecast;
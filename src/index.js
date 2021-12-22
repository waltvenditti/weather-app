import "./style.css";
const { format } = require('date-fns');


// DOM elements
const inputSearch = document.querySelector("#input-search");
const btnSubmit = document.querySelector("#btn-submit");

// helper functions
function meterToFeet(meters) {
  return (meters * 3.2808).toFixed(0);
}

function feetToMile(feet) {
  return (feet / 5280).toFixed(1);
}

// async core functions
async function getCoords(location) {
  const re = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=cda7acdfc26ad0b9968959a4af1eca7e`, 
    { mode: "cors"}
    );
  const data = await re.json();
  return data.coord;
}

async function getWeatherOneCall(lat, lon, units) {
  try {
    const re = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,hourly&appid=cda7acdfc26ad0b9968959a4af1eca7e`
    );
    const data = await re.json();
    return data;
  } catch (error) {
    // additional error handling
    console.log(error);
  }
}

async function getNameAndCountry(location) {
  const re = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=cda7acdfc26ad0b9968959a4af1eca7e`, 
    { mode: "cors"}
    );
    const data = await re.json();
    const nameAndCountry = {
      name: data.name,
      country: data.sys.country,
    }
    console.log(nameAndCountry);
    return nameAndCountry;
}

async function unpackCurrent(data) {
  const wData = {
    temp: data.current.temp,
    feels_like: data.current.feels_like,
    desc: data.current.weather[0].description,
    // humidity is always %
    humidity: data.current.humidity,
    // wind speed is m/s for metric, mph for imperial
    wind: data.current.wind_speed,
    // visibility is always in meters 
    vis: data.current.visibility,
  };
  return wData;
}

async function unpackForecast(data) {
  const forecastArray = []; 
  for (let i = 0; i < 5; i++) {
    let dailyWeather = {
      minT: data.daily[i].temp.min,
      maxT: data.daily[i].temp.max,
      desc: data.daily[i].weather[0].description,
      date: data.daily[i].dt,
    }
    forecastArray.push(dailyWeather);
  }
  return forecastArray;
}

async function handleWeatherRequests(location) { 
  let coords = await getCoords(location);
  if (coords === undefined) {
    console.log('invalid location');
    return null;
  }
  const weatherDataImp = getWeatherOneCall(coords.lat, coords.lon, 'imperial');
  const weatherDataMet = getWeatherOneCall(coords.lat, coords.lon, 'metric');
  const weatherData = await Promise.all([
    weatherDataImp,
    weatherDataMet
  ]);
  const currWeathImp = unpackCurrent(weatherData[0]);
  const forecastImp = unpackForecast(weatherData[0]);
  const currWeathMet = unpackCurrent(weatherData[1]);
  const forecastMet = unpackForecast(weatherData[1]);
  const results = await Promise.all([
    currWeathImp, 
    currWeathMet, 
    forecastImp, 
    forecastMet
  ]);
  return results;
}

// button event listeners 
btnSubmit.addEventListener("click", async () => {
  const location = inputSearch.value;
  const wData = await unpackCurrent(location, 'imperial');
  // const fData = await unpackForecast(location, 'metric');
  console.log(wData);
});


(async () => {
  let data = await handleWeatherRequests('lviv');
  console.log(data);
})();

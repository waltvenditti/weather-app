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

// this function should be mod'd to get lat and lon as arguments, i.e. getCoords is called by a handler function
async function getWeatherOneCall(location, units) {
  try {
    const coords = await getCoords(location);
    const re = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&units=${units}&exclude=minutely,hourly&appid=cda7acdfc26ad0b9968959a4af1eca7e`
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

// will mod this f so it receives the data externally
async function unpackCurrent(location, units) {
  const data = await getWeatherOneCall(location, units);
  const wData = {
    units: `${units}`,
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

async function unpackForecast(location, units) {
  const data = await getWeatherOneCall(location, units);
  const forecastArray = []; 
  for (let i = 0; i < 5; i++) {
    let dailyWeather = {
      units: `${units}`,
      minT: data.daily[i].temp.min,
      maxT: data.daily[i].temp.max,
      desc: data.daily[i].weather[0].description,
      date: data.daily[i].dt,
    }
    forecastArray.push(dailyWeather);
  }
  return forecastArray;
  // return array 
}

async function handleWeatherRequests(location) {
  // the functions are too intertwined
  // here is where location is converted to coordinates 
    // and checked for error in location
  // if location is good get name and country
  // get one call weather in imp and met (2 calls total)
  // for each of the above two calls: 
    // need current weather
    // need forecast data
  // so getWeatherOneCall is called twice
    // on the data returned, unpackCurrent and unpackForecast are both called

  // these should be mod'd so they use weatherOneCalls return data as arguments   
  const currWeathImp = unpackCurrent(location, 'imperial');
  const currWeathMet = unpackCurrent(location, 'metric');
  const forecastImp = unpackForecast(location, 'imperial');
  const forecastMet = unpackForecast(location, 'metric');
  const results = await Promise.all([
    currWeathImp, 
    currWeathMet, 
    forecastImp, 
    forecastMet
  ]);
  return results;
  // get coordinates for locations
    // if not found, end function call with error message 
  // get current data in imperial
  // gets current weather in imperial and metric
  // gets forecast in both imperial and metric
}

// button event listeners 
btnSubmit.addEventListener("click", async () => {
  const location = inputSearch.value;
  const wData = await unpackCurrent(location, 'imperial');
  // const fData = await unpackForecast(location, 'metric');
  console.log(wData);
});

// getWeatherOneCall('lviv', 'imperial');
// unpackForecast('lviv', 'imperial');

(async () => {
  let data = await handleWeatherRequests('lviv');
  console.log(data);
})();

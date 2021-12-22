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
    return nameAndCountry;
}

async function getWeatherOneCall(location, units) {
  try {
    const coords = await getCoords(location);
    const re = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&units=${units}&exclude=minutely,hourly&appid=cda7acdfc26ad0b9968959a4af1eca7e`
    );
    const data = await re.json();
    console.log(data);
    return data;
  } catch (error) {
    // additional error handling
    console.log(error);
  }
}

getWeatherOneCall('murmansk', 'imperial');

// will mod this f so it receives the data externally
async function unpackCurrent(location, units) {
  const data = await getWeatherOneCall(location, units);
  const wData = {
    // name: data.name,
    // units: `${units}`,
    // country: data.sys.country,
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

// button event listeners 
btnSubmit.addEventListener("click", async () => {
  const location = inputSearch.value;
  const wData = await unpackCurrent(location, 'imperial');
  // const fData = await unpackForecast(location, 'metric');
  console.log(wData);
});

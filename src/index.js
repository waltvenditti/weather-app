import "./style.css";
const { format } = require('date-fns');
const { zonedTimeToUtc } = require('date-fns-tz')

// write a function that takes location and returns weather object or whatever

const inputSearch = document.querySelector("#input-search");
const btnSubmit = document.querySelector("#btn-submit");

function meterToFeet(meters) {
  return (meters * 3.2808).toFixed(0);
}

function feetToMile(feet) {
  return (feet / 5280).toFixed(1);
}

async function getCurrentWeather(location, units) {
  try {
    const re = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&APPID=cda7acdfc26ad0b9968959a4af1eca7e`,
      { mode: "cors" }
    );
    const wData = await re.json();
    return wData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getForecast(location, units) {
  try {
    const re = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=cda7acdfc26ad0b9968959a4af1eca7e`,
      { mode: "cors" }
    );
    const wData = await re.json();
    console.log(wData);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function unpackWeather(location, units) {
  const data = await getCurrentWeather(location, units);
  console.log(data);
  const wData = {
    name: data.name,
    units: `${units}`,
    country: data.sys.country,
    timezone: data.timezone,
    temp: data.main.temp.toFixed(1),
    feels_like: data.main.feels_like,
    desc: data.weather[0].description,
    humidity: data.main.humidity,
    wind: data.wind.speed.toFixed(1),
    vis: feetToMile(meterToFeet(data.visibility)),
  };
  return wData;
}

btnSubmit.addEventListener("click", async () => {
  const location = inputSearch.value;
  const wData = await unpackWeather(location, 'imperial');
  console.log(wData);
});

//getForecast("kyiv", 'imperial');
let date = new Date()
let fDate = format(date, 'MM-dd-yyyy hh:mmaa')
let utcDate = zonedTimeToUtc(date);
console.log(date);
console.log(fDate);
console.log(utcDate);

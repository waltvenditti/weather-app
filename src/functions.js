// helper functions
function meterToFeet(meters) {
  return (meters * 3.2808).toFixed(0);
}

function feetToMile(feet) {
  return (feet / 5280).toFixed(1);
}

// async core functions
export async function getCoords(location) {
  const re = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=cda7acdfc26ad0b9968959a4af1eca7e`,
    { mode: "cors" }
  );
  const data = await re.json();
  return data.coord;
}

export async function getWeatherOneCall(lat, lon, units) {
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

export async function getNameAndCountry(location) {
  const re = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=cda7acdfc26ad0b9968959a4af1eca7e`,
    { mode: "cors" }
  );
  const data = await re.json();
  const nameAndCountry = {
    name: data.name,
    country: data.sys.country,
  };
  return nameAndCountry;
}

export async function unpackCurrent(data) {
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
    icon: data.current.weather[0].icon,
    date: data.current.dt
  };
  return wData;
}

export async function unpackForecast(data) {
  const forecastArray = [];
  for (let i = 0; i < 5; i++) {
    const dailyWeather = {
      minT: data.daily[i].temp.min,
      maxT: data.daily[i].temp.max,
      desc: data.daily[i].weather[0].description,
      date: data.daily[i].dt,
      icon: data.daily[i].weather[0].icon
    };
    forecastArray.push(dailyWeather);
  }
  return forecastArray;
}

export async function handleWeatherRequests(location) {
  const coords = await getCoords(location);
  if (coords === undefined) {
    console.log("invalid location");
    return null;
  }
  
  const weatherDataImp = getWeatherOneCall(coords.lat, coords.lon, "imperial");
  const weatherDataMet = getWeatherOneCall(coords.lat, coords.lon, "metric");
  const weatherData = await Promise.all([weatherDataImp, weatherDataMet]);
  const nameAndCountry = getNameAndCountry(location);
  const currWeathImp = unpackCurrent(weatherData[0]);
  const forecastImp = unpackForecast(weatherData[0]);
  const currWeathMet = unpackCurrent(weatherData[1]);
  const forecastMet = unpackForecast(weatherData[1]);
  const results = await Promise.all([
    nameAndCountry,
    currWeathImp,
    currWeathMet,
    forecastImp,
    forecastMet,
  ]);
  return results;
}

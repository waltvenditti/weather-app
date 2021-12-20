import "./style.css";

// write a function that takes location and returns weather object or whatever


/*
function getCurrentWeather(location) {
    let wData;
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=cda7acdfc26ad0b9968959a4af1eca7e`
      )
      .then(response => response.json())
      .then(data => wData = data)
      .then(() => console.log(wData));
    return wData;
}
console.log(getCurrentWeather('kyiv'));
*/



function kToF(kTemp) {
    return (((kTemp - 273.15)*1.8)+32.0).toFixed(1);
}

async function getCurrentWeather(location) {
  try {
    const re = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=cda7acdfc26ad0b9968959a4af1eca7e`
    );
    const wData = await re.json();
    return wData;
  } catch (error) {
    console.log(error);
    return false; 
  }
}

async function unpackWeather() {
    const data = await getCurrentWeather('kyiv');
    console.log(`Weather for ${data.name}`);
    console.log(kToF(data.main.temp));
    console.log(data.weather[0].description);
    console.log(`Local time is ${data}`);
    let date = new Date();
    console.log(date.getTime());
}

unpackWeather();



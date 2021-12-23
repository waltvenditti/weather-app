import { unpackCurrent } from './functions.js';
import testImage from './10d@2x.png';
import { doc } from 'prettier';

const { format } = require('date-fns');

// DOM elements
const inputSearch = document.querySelector('#input-search');
const btnSubmit = document.querySelector('#btn-submit');
// const testImg1 = document.querySelector('#img-current-weather');
const imgf0 = document.querySelector('#img-f-0');
const imgf1 = document.querySelector('#img-f-1');
const imgf2 = document.querySelector('#img-f-2');
const imgf3 = document.querySelector('#img-f-3');
const imgf4 = document.querySelector('#img-f-4');

// testImg1.src = testImage;
imgf0.src = testImage;
imgf1.src = testImage;
imgf2.src = testImage;
imgf3.src = testImage;
imgf4.src = testImage;


// button event listeners 
btnSubmit.addEventListener("click", async () => {
    const location = inputSearch.value;
    const wData = await unpackCurrent(location, 'imperial');
    // const fData = await unpackForecast(location, 'metric');
    console.log(wData);
  });


// DOM Constructors 
export function createCurrentWeatherCard(objectID, objectF, objectC) {
    // create DOM elements
    const divMaster = document.querySelector('#div-current-weather-master');
    const divCurrent = document.createElement('div');
    const divLocAndDate = document.createElement('div');
    const divPicDescTemp = document.createElement('div');
    const divCurrentWeather = document.createElement('div');
    const divOtherWeather = document.createElement('div');
    const imgCurrent = new Image();
    const pLocation = document.createElement('p');
    const pDate = document.createElement('p');
    const pDesc = document.createElement('p');
    const pTempF = document.createElement('p');
    const pTempC = document.createElement('p');
    const pFeelsLike = document.createElement('p');
    const pHumidity = document.createElement('p');
    const pWind = document.createElement('p');
    const pVis = document.createElement('p');

    // assign id's, classes, and img src
    divCurrent.classList.add('div-current');
    divLocAndDate.classList.add('div-loc-and-date');
    divPicDescTemp.classList.add('div-pic-desc-temp');
    divCurrentWeather.classList.add('div-current-weather');
    divOtherWeather.classList.add('div-other-weather');
    imgCurrent.src = `http://openweathermap.org/img/wn/${objectF.icon}@2x.png`;

    // text content 
    pLocation.textContent = `${objectID.name}, ${objectID.country}`;
    pDate.textContent = `${format(objectF.date*1000, 'MMMM dd')}`;
    pDesc.textContent = `${objectF.desc}`;
    pTempF.textContent = `${objectF.temp}F`;
    pTempC.textContent = `${objectC.temp}C`;
    pFeelsLike.textContent = `Feels like: ${objectF.feels_like}F  (${objectC.feels_like}C)`;
    pHumidity.textContent = `Humidity: ${objectF.humidity}%`;
    pWind.textContent = `${objectF.wind} mph (${objectC.wind} m/s)`;
    pVis.textContent = `Visibility: ${objectC.vis} meters`;

    // build DOM
    divMaster.appendChild(divCurrent);
    divCurrent.appendChild(divLocAndDate);
    divLocAndDate.appendChild(pLocation);
    divLocAndDate.appendChild(pDate);
    divCurrent.appendChild(divPicDescTemp);
    divPicDescTemp.appendChild(imgCurrent);
    divPicDescTemp.appendChild(divCurrentWeather);
    divCurrentWeather.appendChild(pDesc);
    divCurrentWeather.appendChild(pTempF);
    divCurrentWeather.appendChild(pTempC);
    divCurrent.appendChild(divOtherWeather);
    divOtherWeather.appendChild(pFeelsLike);
    divOtherWeather.appendChild(pHumidity);
    divOtherWeather.appendChild(pWind);
    divOtherWeather.appendChild(pVis);
}

export function createForecastCard(objectF, objectC, idNum) {
  // create DOM elements
  const divForecast = document.querySelector('.div-forecast');
  const divDailyForecast = document.createElement('div');
  const pTitle = document.createElement('p');
  const pDesc = document.createElement('p');
  const pMaxT = document.createElement('p');
  const pMinT = document.createElement('p');
  const imgForecast = new Image();

  // assign id's, classes, and img src
  divDailyForecast.setAttribute('id', `df${idNum}`);
  divDailyForecast.classList.add('div-daily-forecast');
  imgForecast.src = `http://openweathermap.org/img/wn/${objectF.icon}@2x.png`;

  // text content
  pDesc.textContent = objectF.desc;
  pMaxT.textContent = `High: ${objectF.maxT}F (${objectC.maxT}C)`;
  pMinT.textContent = `Low: ${objectF.minT} (${objectC.minT})`;

  // build DOM
  divForecast.appendChild(divDailyForecast);
  divDailyForecast.appendChild(pTitle);
  divDailyForecast.appendChild(imgForecast);
  divDailyForecast.appendChild(pDesc);
  divDailyForecast.appendChild(pMaxT);
  divDailyForecast.appendChild(pMinT);
}

export function createForecast(arrayF, arrayC) {
  for (let i = 0; i < 5; i++) {
    createForecastCard(arrayF[i], arrayC[i], i);
  }
}

export function deleteCurrentWeatherCard() {
  const divMaster = document.querySelector('#div-current-weather-master');
  const divCurrent = document.querySelector('.div-current');
  divMaster.removeChild(divCurrent);
}

export function deleteAllForecastCards() {
  const divMaster = document.querySelector('#div-forecast-master')
  const divForecast = document.querySelector('.div-forecast');
  divMaster.removeChild(divForecast);
}
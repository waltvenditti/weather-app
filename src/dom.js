import { unpackCurrent } from './functions.js';
import testImage from './10d@2x.png';
const { format } = require('date-fns');

// DOM elements
const inputSearch = document.querySelector('#input-search');
const btnSubmit = document.querySelector('#btn-submit');
const testImg1 = document.querySelector('#img-current-weather');
const imgf0 = document.querySelector('#img-f-0');
const imgf1 = document.querySelector('#img-f-1');
const imgf2 = document.querySelector('#img-f-2');
const imgf3 = document.querySelector('#img-f-3');
const imgf4 = document.querySelector('#img-f-4');

testImg1.src = testImage;
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

    // assign id's and img src
    divCurrent.setAttribute('id', 'div-curent');
    divLocAndDate.setAttribute('id', 'div-loc-and-date');
    divPicDescTemp.setAttribute('id', 'div-pic-desc-temp');
    divCurrentWeather.setAttribute('id', 'div-current-weather');
    divOtherWeather.setAttribute('id', 'div-other-weather');
    imgCurrent.src = `http://openweathermap.org/img/wn/${objectF.icon}@2x.png`;

    // text content 
    pLocation.textContent = `${objectID.name}, ${objectID.country}`;
    pDate.textContent = `${format(objectF.date*1000, 'MMMM dd')}`;
    pDesc.textContent = `${objectF.desc}`;
    pTempF.textContent = `${objectF.temp}`;
    pTempC.textContent = `${objectC.temp}`;
    pFeelsLike.textContent = `${objectF.feels_like} / ${objectC.feels_like}`;
    pHumidity.textContent = `${objectF.humidity}`;
    pWind.textContent = `${objectF.wind}mph / ${objectC.wind}m/s`;
    pVis.textContent = `${objectC.vis}`;

    // build DOM
    divMaster.appendChild(divCurrent);
    divCurrent.appendChild(divLocAndDate);
    divCurrent.appendChild(divPicDescTemp);
    divPicDescTemp.appendChild(imgCurrent);
    divPicDescTemp.appendChild(divCurrentWeather);
    divCurrent.appendChild(divOtherWeather);
}
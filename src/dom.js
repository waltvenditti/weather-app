import { doc } from 'prettier';
import { handleWeatherRequests} from "./functions.js";

const { format } = require('date-fns');

// DOM elements
const inputSearch = document.querySelector('#input-search');
const btnSubmit = document.querySelector('#btn-submit');


// Helper Functions
function returnTitleCase(string) {
  const wordArray = string.split(' ');
  const newArray = [];
  for (let i = 0; i < wordArray.length; i++) {
    const word = wordArray[i];
    const newWord = word.charAt(0).toUpperCase() + word.slice(1);
    newArray.push(newWord);
  }
  return(newArray.join(' '));
}


// DOM Constructors 
export function createCurrentWeatherCard(objectID, objectF, objectC) {
    // create DOM elements
    const divMaster = document.querySelector('#div-current-weather-master');
    const divCurrent = document.createElement('div');
    const divLocAndDate = document.createElement('div');
    const divPicDescTemp = document.createElement('div');
    const divCurrentWeather = document.createElement('div');
    const divOtherWeather = document.createElement('div');
    const divFeelsLike = document.createElement('div');
    const divHumidity = document.createElement('div');
    const divWind = document.createElement('div');
    const divVis = document.createElement('div');
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
    const spanFeelsLike = document.createElement('span');
    const spanHumidity = document.createElement('span');
    const spanWind = document.createElement('span');
    const spanVis = document.createElement('span');

    // assign id's, classes, and img src
    divCurrent.classList.add('div-current');
    divLocAndDate.classList.add('div-loc-and-date');
    divPicDescTemp.classList.add('div-pic-desc-temp');
    divCurrentWeather.classList.add('div-current-weather');
    divOtherWeather.classList.add('div-other-weather');
    imgCurrent.src = `http://openweathermap.org/img/wn/${objectF.icon}@2x.png`;

    // text content and styles
    pLocation.textContent = `${objectID.name}, ${objectID.country}`;
    pDate.textContent = `${format(objectF.date*1000, 'MMMM dd')}`;
    pDesc.textContent = `${returnTitleCase(objectF.desc)}`;
    pTempF.textContent = `${objectF.temp}\xB0F`;
    pTempC.textContent = `${objectC.temp}\xB0C`;
    pFeelsLike.textContent = `${objectF.feels_like}\xB0F  (${objectC.feels_like}\xB0C)`;
    spanFeelsLike.textContent = 'Feels like:';
    pHumidity.textContent = `${objectF.humidity}%`;
    spanHumidity.textContent = 'Humidity:';
    pWind.textContent = `${objectF.wind} mph (${objectC.wind} m/s)`;
    spanWind.textContent = 'Wind:'
    pVis.textContent = `${objectC.vis} meters`;
    spanVis.textContent = 'Visibility:'
    // styles
    pLocation.style['font-weight'] = 'bold';
    pLocation.style['font-size'] = '18px';
    pLocation.style.color = 'darkblue'
    pTempF.style['font-size'] = '24px';
    pTempF.style['font-weight'] = 'bold';
    divFeelsLike.style.display = 'flex';
    spanFeelsLike.style['font-weight'] = 'bold';
    divHumidity.style.display = 'flex';
    spanHumidity.style['font-weight'] = 'bold';
    divWind.style.display = 'flex';
    spanWind.style['font-weight'] = 'bold';
    divVis.style.display = 'flex';
    spanVis.style['font-weight'] = 'bold';

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
    divOtherWeather.appendChild(divFeelsLike);
    divFeelsLike.appendChild(spanFeelsLike);
    divFeelsLike.appendChild(pFeelsLike);
    divOtherWeather.appendChild(divHumidity);
    divHumidity.appendChild(spanHumidity);
    divHumidity.appendChild(pHumidity);
    divOtherWeather.appendChild(divWind);
    divWind.appendChild(spanWind);
    divWind.appendChild(pWind);
    divOtherWeather.appendChild(divVis);
    divVis.appendChild(spanVis);
    divVis.appendChild(pVis);
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
  if (idNum === 0) {
    pTitle.textContent = `Today, ${format(objectC.date*1000, 'MM/dd')}`;
  } else pTitle.textContent = `${format(objectC.date*1000, 'MM/dd')}`;
  pDesc.textContent = returnTitleCase(objectF.desc);
  pMaxT.textContent = `High: ${objectF.maxT.toFixed(1)}\xB0F (${objectC.maxT.toFixed(1)}\xB0C)`;
  pMinT.textContent = `Low: ${objectF.minT.toFixed(1)}\xB0F (${objectC.minT.toFixed(1)}\xB0C)`;

  // text styles
  pTitle.style['font-weight'] = 'bold';
  pMaxT.style.color = 'red';
  pMaxT.style['font-weight'] = 'bold';
  pMinT.style.color = 'blue';
  pMinT.style['font-weight'] = 'bold';

  // build DOM
  divForecast.appendChild(divDailyForecast);
  divDailyForecast.appendChild(pTitle);
  divDailyForecast.appendChild(imgForecast);
  divDailyForecast.appendChild(pDesc);
  divDailyForecast.appendChild(pMaxT);
  divDailyForecast.appendChild(pMinT);
}

export function createForecast(arrayF, arrayC) {
  const divForecastMaster = document.querySelector('#div-forecast-master');
  const divForecast = document.createElement('div');
  divForecastMaster.appendChild(divForecast);
  divForecast.classList.add('div-forecast');
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

export async function constructInitialHtml() {
  const input = document.querySelector('#input-search');
  console.log("Calling London");
  const data = await handleWeatherRequests('london');
  console.log("heard back from London");
  input.value = '';
  createCurrentWeatherCard(data[0], data[1], data[2]);
  deleteAllForecastCards();
  const divForecast = document.createElement('div');
  divForecast.classList.add('div-forecast');
  const divForecastMaster = document.querySelector('#div-forecast-master');
  divForecastMaster.appendChild(divForecast);
  createForecast(data[3], data[4]);
}

// button event listeners 
btnSubmit.addEventListener("click", async () => {
  const location = inputSearch.value;
  const data = await handleWeatherRequests(location);
  console.log(data);
  if (data === null) {
    inputSearch.value = 'Invalid Location';
    return;
  }
  deleteCurrentWeatherCard();
  createCurrentWeatherCard(data[0], data[1], data[2]);
  deleteAllForecastCards();
  createForecast(data[3], data[4]);
  inputSearch.value = '';
});
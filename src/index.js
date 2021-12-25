import "./style.css";
import { handleWeatherRequests} from "./functions.js";
import { createCurrentWeatherCard, deleteCurrentWeatherCard, deleteAllForecastCards, createForecastCard, createForecast } from './dom.js';

(async () => {
  const input = document.querySelector('#input-search');
  const data = await handleWeatherRequests('london');
  input.value = '';
  createCurrentWeatherCard(data[0], data[1], data[2]);
  deleteAllForecastCards();
  const divForecast = document.createElement('div');
  divForecast.classList.add('div-forecast');
  const divForecastMaster = document.querySelector('#div-forecast-master');
  divForecastMaster.appendChild(divForecast);
  createForecast(data[3], data[4]);
})();




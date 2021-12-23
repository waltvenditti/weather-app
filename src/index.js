import "./style.css";
import { handleWeatherRequests} from "./functions.js";
import { createCurrentWeatherCard } from './dom.js';

(async () => {
  let data = await handleWeatherRequests('lviv');
  console.log(data);
  // createCurrentWeatherCard(data[0], data[1], data[2]);
})();




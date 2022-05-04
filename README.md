Weather App
===========

see live: https://waltvenditti.github.io/weather-app/

instructions: you can search locations either by city name (don't include country) or zipcode/postal code. Unfortunately I did not have enough knowledge to figure out how to make search queries more specific. If multiple countries have a city with the same name, the program will generally return results for whichever city is larger. Sometimes using zipcodes can get you around this, but there is no guarantee (the zipcode for my hometown returns weather results for an eastern European city, for example). 

This project was assigned by The Odin Project in a lesson on async functions, which was part of the larger lesson on JavaScript. The idea was that using calls to an API to fetch weather data was a good example of a real-world application of asnyc programming. I recall spending some time reading the documentation for OpenWeatherMap to figure out what exact functions should be used to get the data I wanted, and how that data was organizing in the JSON files sent by the service. 

The app was written using vanilla JavaScript and HTML/CSS, which lead to some elaborate use of "createElement" and "appendChild" to put the right things on screen. I was happy to learn React in the following lessons and thus be able to cast aside rendering DOM elements in this manner. 

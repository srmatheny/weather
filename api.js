import { key } from "./key.js";

export function greet() {
    console.log(key);
};

console.log("api.js is running");

//Module globals
let cityChoice;  //city

const apiKey = '3LYP7YAJ8DVVXHPKT4TQW254J';
const location = 'Las Vegas';
const unitGroup = 'metric';
const contentType = 'json';

const urlBase = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityChoice}?key=${key}`;
console.log(urlBase);

export async function fetchDataFromAPI() {
    //e.preventDefault();


    //Get city from text input - default to Las Vegas for now
    cityChoice = 'Las Vegas';

    //build a coordinate requuest URL:
    // Construct the API URL
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
        ${encodeURIComponent(cityChoice)}?unitGroup=${unitGroup}&key=${key}&contentType=${contentType}`;

    const response = await fetch(url);
    const weatherData = await response.json();

    // Handle the weather data
    console.log('Weather data:', weatherData);
    const todayWeather = weatherData.days[0];
    const currentConditions = weatherData.days[0].conditions;
    console.log(`Date: ${todayWeather.datetime}, TempMax: ${todayWeather.tempmax}°C, TempMin: ${todayWeather.tempmin}°C`);
    console.log(currentConditions);
    
}



/*
// Fetch the data using the Fetch API
fetch(url, {
    method: 'GET'
})
.then(response => {
    if (!response.ok) {
        // If response is not ok, throw to enter the catch block
        throw response;
    }
    return response.json(); // Parse the response as JSON
})
.then(data => {
    // Handle the weather data
    console.log('Weather data:', data);
    const todayWeather = data.days[0];
    console.log(`Date: ${todayWeather.datetime}, TempMax: ${todayWeather.tempmax}°C, TempMin: ${todayWeather.tempmin}°C`);
})
.catch(err => {
    console.error('Error fetching weather data:', err);
    if (err.text) {
        err.text().then(errorMessage => {
            console.error('Error message:', errorMessage);
        });
    }
});
*/


/*processData.js*/
//import { fetchDataFromAPI, greet } from "../api.js";


export const processData = (weatherData) => {

    console.log('running processData in processData.js');
    //console.log('Weather data:', weatherData);

    //greet();

    //console.log(weatherData);

    //const weatherData = fetchDataFromAPI();
    // const todayWeather = weatherData.days[0];
    // const theCurrentConditions = weatherData.days[0].conditions;
    // console.log(`Date: ${todayWeather.datetime}, TempMax: ${todayWeather.tempmax}°C, TempMin: ${todayWeather.tempmin}°C`);
    // console.log(theCurrentConditions);


    const { alerts, currentConditions, days, description, latitude, longitude, resolvedAddress, timezone } = weatherData;
    const newData = { alerts, currentConditions, days, description, latitude, longitude, resolvedAddress, timezone };
    //console.log(newData);


    return newData;

}





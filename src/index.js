import "./styles.css";

import { format, parseISO, parse } from 'date-fns';
import { fetchDataFromAPI, greet } from "../api.js";
import { processData } from "./processData.js";
import { IMAGES } from './images.js';

/*api.js*/
//import { fetchDataFromAPI, greet } from "../api.js";

/*greeting*/
import { greeting } from "./greeting.js";
console.log(greeting);
/*image import*/
//import odinImage from "./odin.png";
//import partlyCloudyNight from "../icons/partly-cloudy-night.png";

// const image = document.createElement("img");
// image.src = IMAGES.odin;
// image.style.width = "100px";
// image.style.height = "auto";
// const logoArea = document.getElementById('image-container');
// logoArea.appendChild(image);
/*end image import*/

/*Global Const*/
let city;
const cityInput = document.getElementById('input-search');
//console.log(cityInput);

city = cityInput.value;
//console.log(city);



const myApp = async (city) => {

    try {
        //city = 'London';
        
        console.log(city);

        const data = await fetchDataFromAPI(city);
        
        const result = processData(data);

        console.log("Final result in Index.js myApp: ", result);

        domManip(result);

    } catch (error) {
        console.log("An error occurred in the Index.js myApp process: ", error);
    }
    
};   

setupButtonListener();

myApp(city);





  

function domManip(result) {
    const appArea = document.getElementById('app');
    const appHdr = document.getElementById('app-hdr');
    const appDetails = document.getElementById('app-details');

    /*Build header area*/
    createHdr();
    createFiveDay();
    createStats();
    createDetails();

    function createHdr () {
        //Image - Icon Area**********************
        const imgArea = document.getElementById('hdr-icon');
        imgArea.innerHTML = '';
        const hdrImg = document.createElement("img");
        //hdrImg.src = getWeatherIcon(result.currentConditions.icon); //odinImage; 
        hdrImg.src = IMAGES.odin; 
        hdrImg.style.width = "75px";
        hdrImg.style.height = "auto";
        imgArea.appendChild(hdrImg);
        imgArea.style.width = '75px';
        //END IMAGE / ICON AREA *******************

        //City name / weather brief area***********
        //Header text area
        const hdrText = document.getElementById('hdr-text');
        hdrText.innerText = "Shitty Wok Weather App";


        //Header date/time area
        const hdrDateTime = document.getElementById('hdr-date-time');
                
        let time = result.currentConditions.datetime;
        //console.log(time);
        let cDate = result.days[0].datetime;
        //console.log(cDate);
        const dateObject = parseISO(result.days[0].datetime);
        const formattedDate = format(dateObject, "MMMM dd, yyyy");
        //console.log(formattedDate);

        const timeObject = parse(time, 'HH:mm:ss', cDate);
        const formattedTime = format(timeObject, 'hh:mm a');
        //console.log(formattedTime);
        
        hdrDateTime.innerHTML = `
            <p>${formattedDate}</p>
            <p>Last Update: ${formattedTime}</p>
        `;
    };

    function createDetails () {
        const cityName = document.getElementById('name-cell');
        const conditions = document.getElementById('conditions-cell');
        const tempText = document.getElementById('temp-cell');
        const imgArea = document.getElementById('icon-cell');
        const sunriseArea = document.getElementById('sunrise-cell');
        const sunsetArea = document.getElementById('sunset-cell');
        //CITY NAME
        cityName.innerText = result.resolvedAddress;
        //CURRENT WEATHER ICON
        imgArea.innerHTML = '';
        const iconImg = document.createElement("img");
        iconImg.style.width = "100px";
        iconImg.style.height = "auto";
        iconImg.src = getWeatherIcon(result.currentConditions.icon);
        imgArea.appendChild(iconImg);
        //CURRENT TEMP & HUMID
        let temp = result.currentConditions.temp;
        let humid = result.currentConditions.humidity;
        tempText.innerHTML = temp + "\u00B0F" + " / " + humid + "% rh";
        //CURRENT CONDITIONS
        conditions.innerText = result.currentConditions.conditions;

        //CURRENT SUNRISE & SUNSET 
        let sunriseTime = result.currentConditions.sunrise;
        let sunsetTime = result.currentConditions.sunset;
        let baseDate = result.days[0].datetime;
        const sunrisetimeObj = parse(sunriseTime, 'HH:mm:ss', baseDate);
        const sunsetTimeObj = parse(sunsetTime, 'HH:mm:ss', baseDate);
        const sunriseFormatted = format(sunrisetimeObj, 'hh:mm a');
        const sunsetFormatted = format(sunsetTimeObj, 'hh:mm a');
        sunriseArea.innerHTML = "Local Sunrise: " + sunriseFormatted;
        sunsetArea.innerText = "Local Sunset: " + sunsetFormatted;

    };

    function createStats () {
        const windCellDesc = document.getElementById('wind-cell-desc');
        const windCellNum = document.getElementById('wind-cell-num');
        const humidCellDesc = document.getElementById('humid-cell-desc');
        const humidCellNum = document.getElementById('humid-cell-num');
        const feelsCellDesc = document.getElementById('feels-cell-desc');
        const feelsCellNum = document.getElementById('feels-cell-num');
        const rainCellDesc = document.getElementById('rain-cell-desc');
        const rainCellNum = document.getElementById('rain-cell-num');


        //-------------------WIND AREA--------------------------
        let windString = result.currentConditions.windspeed;
        let gustString = result.currentConditions.windgust;
        console.log(windString);
        console.log(gustString);
        windCellDesc.textContent = 'Wind Speed / Gusts';
        windCellNum.innerHTML = windString + "mph" + " / " + gustString +"mph";

        //--------------------HUMIDITY AREA---------------------
        let humidString = result.currentConditions.humidity;
        console.log(humidString);
        humidCellDesc.textContent = 'Humidity';
        humidCellNum.innerHTML = humidString + "%";

        //-------------------FEELS LIKE AREA-------------------
        let feelsString = result.currentConditions.feelslike;
        console.log(feelsString);
        feelsCellDesc.textContent = 'Feels Like';
        feelsCellNum.innerHTML = feelsString + "\u00B0F";

        //-------------------CHANCE OF RAIN AREA------------------
        let rainChanceString = result.currentConditions.precipprob;
        console.log(rainChanceString);
        rainCellDesc.textContent = 'Precipitation Probability'
        rainCellNum.innerHTML = rainChanceString + "%";

    };

    function createFiveDay () {
        const imgArea = document.getElementById('day-one-img');
        const descArea = document.getElementById('day-one-desc');
        const tempArea = document.getElementById('day-one-temp');
        const imgTwoArea = document.getElementById('day-two-img');
        const descTwoArea = document.getElementById('day-two-desc');
        const tempTwoArea = document.getElementById('day-two-temp');
        const imgThreeArea = document.getElementById('day-three-img');
        const descThreeArea = document.getElementById('day-three-desc');
        const tempThreeArea = document.getElementById('day-three-temp');
        const imgFourArea = document.getElementById('day-four-img');
        const descFourArea = document.getElementById('day-four-desc');
        const tempFourArea = document.getElementById('day-four-temp');
        const imgFiveArea = document.getElementById('day-five-img');
        const descFiveArea = document.getElementById('day-five-desc');
        const tempFiveArea = document.getElementById('day-five-temp');

        // ---------------------DAY ONE----------------
        //display the day
        let dayOneDate = format(parseISO(result.days[1].datetime), "MMMM dd, yyyy"); 
        descArea.innerText = dayOneDate;

        //display the condition / temp
        let tempString = result.days[1].temp;
        let humidity = result.days[1].humidity;
        //console.log(tempString)
        //console.log(humidity);
        tempArea.innerHTML = tempString + "\u00B0F" + " / " + humidity + "%";

        //display the icon per icon field
        imgArea.innerHTML = '';
        const hdrImg = document.createElement("img");
        hdrImg.src = getWeatherIcon(result.days[1].icon); //day one icon?; 
        imgArea.appendChild(hdrImg);

// ---------------------DAY TWO----------------
        //display the day
        let dayTwoDate = format(parseISO(result.days[2].datetime), "MMMM dd, yyyy"); 
        descTwoArea.innerText = dayTwoDate;

        //display the condition / temp
        let tempTwoString = result.days[2].temp;
        let humidityTwo = result.days[2].humidity;
        //console.log(tempTwoString)
        //console.log(humidityTwo);
        tempTwoArea.innerHTML = tempTwoString + "\u00B0F" + " / " + humidityTwo + "%";

        //display the icon per icon field
        imgTwoArea.innerHTML = '';
        const hdrTwoImg = document.createElement("img");
        hdrTwoImg.src = getWeatherIcon(result.days[2].icon); //day one icon?; 
        imgTwoArea.appendChild(hdrTwoImg);
        
// ---------------------DAY Three----------------
        //display the day
        let dayThreeDate = format(parseISO(result.days[3].datetime), "MMMM dd, yyyy"); 
        descThreeArea.innerText = dayThreeDate;

        //display the condition / temp
        let tempThreeString = result.days[3].temp;
        let humidityThree = result.days[3].humidity;
        //console.log(tempThreeString)
        //console.log(humidityThree);
        tempThreeArea.innerHTML = tempThreeString + "\u00B0F" + " / " + humidityThree + "%";

        //display the icon per icon field
        imgThreeArea.innerHTML = '';
        const hdrThreeImg = document.createElement("img");
        hdrThreeImg.src = getWeatherIcon(result.days[3].icon); //day one icon?; 
        imgThreeArea.appendChild(hdrThreeImg);

// ---------------------DAY FOUR----------------
        //display the day
        let dayFourDate = format(parseISO(result.days[4].datetime), "MMMM dd, yyyy"); 
        descFourArea.innerText = dayFourDate;

        //display the condition / temp
        let tempFourString = result.days[4].temp;
        let humidityFour = result.days[4].humidity;
        //console.log(tempFourString)
        //console.log(humidityFour);
        tempFourArea.innerHTML = tempFourString + "\u00B0F" + " / " + humidityFour + "%";

        //display the icon per icon field
        imgFourArea.innerHTML = '';
        const hdrFourImg = document.createElement("img");
        hdrFourImg.src = getWeatherIcon(result.days[4].icon); //day one icon?; 
        imgFourArea.appendChild(hdrFourImg);

// ---------------------DAY FIVE----------------
        //display the day
        let dayFiveDate = format(parseISO(result.days[5].datetime), "MMMM dd, yyyy"); 
        descFiveArea.innerText = dayFiveDate;

        //display the condition / temp
        let tempFiveString = result.days[5].temp;
        let humidityFive = result.days[5].humidity;
        //console.log(tempFiveString)
        //console.log(humidityFive);
        tempFiveArea.innerHTML = tempFiveString + "\u00B0F" + " / " + humidityFive + "%";

        //display the icon per icon field
        imgFiveArea.innerHTML = '';
        const hdrFiveImg = document.createElement("img");
        hdrFiveImg.src = getWeatherIcon(result.days[5].icon); //day one icon?; 
        imgFiveArea.appendChild(hdrFiveImg);
    };
};



function setupButtonListener() {
    
    const inputBtn = document.getElementById('search');

    if (inputBtn) {
            inputBtn.addEventListener('click', getUserInput);

    } else {
        console.error("Button element not found!");
    };
};
function getUserInput () {
    
    console.log("Button clicked!");
    console.log("in the get input func");

    alert(cityInput.value);
    
    myApp(cityInput.value);

};


function getWeatherIcon(currentDesc) {
    
    console.log(currentDesc);
    const temp = currentDesc + '.png';
    console.log(temp);
    //let image = document.createElement("img");
    //image.src = temp;
    //import tempImage from `${temp}`;

    if (currentDesc == 'partly-cloudy-night') return IMAGES.partlyCloudyNight;
    else if (currentDesc == 'clear-day') return IMAGES.clearDay;
    else if (currentDesc == 'clear-night') return IMAGES.clearNight;
    else if (currentDesc == 'cloudy') return IMAGES.cloudy;
    else if (currentDesc == 'fog') return IMAGES.fog;
    else if (currentDesc == 'hail') return IMAGES.hail;
    else if (currentDesc == 'partly-cloudy-day') return IMAGES.partlyCloudyDay;
    else if (currentDesc == 'rain-snow-showers-day') return IMAGES.rainSnowShowersDay;
    else if (currentDesc == 'rain-snow-showers-night') return IMAGES.rainSnowShowersNight;
    else if (currentDesc == 'rain-snow') return IMAGES.rainSnow;
    else if (currentDesc == 'rain') return IMAGES.rain;
    else if (currentDesc == 'showers-day') return IMAGES.showersDay;
    else if (currentDesc == 'showers-night') return IMAGES.showersNight;
    else if (currentDesc == 'sleet') return IMAGES.sleet;
    else if (currentDesc == 'snow-showers-day') return IMAGES.snowShowersDay;
    else if (currentDesc == 'snow-showers-night') return IMAGES.snowshowersNight;
    else if (currentDesc == 'snow') return IMAGES.snow;
    else if (currentDesc == 'thunder-rain') return IMAGES.thunderRain;
    else if (currentDesc == 'thunder-showers-day') return IMAGES.thunderShowersDay;
    else if (currentDesc == 'thunder-showers-night') return IMAGES.thunderShowersNight;
    else if (currentDesc == 'thunder') return IMAGES.thunder;
    else if (currentDesc == 'wind') return IMAGES.wind;
    else {
        alert("Unkown icon returned - " + currentDesc);
        return IMAGES.clearDay;
    };

};

//domManip();

//processData();


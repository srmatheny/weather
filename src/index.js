import "./styles.css";

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

const image = document.createElement("img");
image.src = IMAGES.odin;
image.style.width = "100px";
image.style.height = "auto";
const logoArea = document.getElementById('image-container');
logoArea.appendChild(image);
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

function handleClick() {
    console.log("Button clicked!");
    alert(cityInput.value);
    
    myApp(cityInput.value);
};

function setupButtonListener() {
    
    const inputBtn = document.getElementById('search');

    if (inputBtn) {
            inputBtn.addEventListener('click', getUserInput);

    } else {
        console.error("Button element not found!");
    };
};

  

function domManip(result) {
    const appArea = document.getElementById('app');
    const appHdr = document.getElementById('app-hdr');
    const appDetails = document.getElementById('app-details');

    /*Build header area*/
    createHdr();

    


    function createHdr () {
        //Image - Icon Area**********************
        const imgArea = document.getElementById('hdr-icon');
        imgArea.innerHTML = '';
        const hdrImg = document.createElement("img");
        hdrImg.src = getWeatherIcon(result.currentConditions.icon); //odinImage; 
        hdrImg.style.width = "75px";
        hdrImg.style.height = "auto";
        imgArea.appendChild(hdrImg);
        imgArea.style.width = '75px';
        //END IMAGE / ICON AREA *******************

        //City name / weather brief area***********
        //Header text area
        const hdrText = document.getElementById('hdr-text');
        hdrText.innerText = result.resolvedAddress + "\x09" + result.currentConditions.conditions;

        //Header date/time area
        const hdrDateTime = document.getElementById('hdr-date-time');
        let temp = new Date(result.days[0].datetime);
        //let temp = new Date(result.currentConditions.datetime);
        console.log(temp);
        const usDate = (temp).toLocaleDateString('en-US');
        console.log(usDate);
        
        hdrDateTime.innerHTML = `
            <p>${temp}</p>
            <p>${usDate}</p>
            <p>Current Time: ${result.currentConditions.datetime}</p>
        `;
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


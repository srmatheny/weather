/*processData.js*/
import { fetchDataFromAPI, greet } from "../api.js";

function processData() {

    console.log('running processData in processData.js');
    

    greet();

    fetchDataFromAPI();



}

export { processData };




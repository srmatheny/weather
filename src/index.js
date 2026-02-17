import "./styles.css";

import { processData } from "./processData.js";

/*api.js*/
//import { fetchDataFromAPI, greet } from "../api.js";

/*greeting*/
import { greeting } from "./greeting.js";
console.log(greeting);
/*image import*/
import odinImage from "./odin.png";
const image = document.createElement("img");
image.src = odinImage;
document.body.appendChild(image);

processData();


import data from "./data.js"
import {createTableElements} from "./main.js";

/*
  ALWAYS USE IMPORTED data ARRAY TO MAKE MANIPULATIONS

  ID for allcities table is #allcities
  ID for singlecity table is #singlecity
/*

/*
* PASS ARRAY TO createTableElements function to fill tables
* first argument - data
* second argument - tableId-----
* Example createTableElements([{name: "Istanbul"}], "allcities");
*/

/*
    ids for buttons and select

    Population - bigger than 500.000 => #populationBigger
    land area - less than 1000 => #landAreaLess
    Does any city has population less than 100.000? => #isPopulationLess
    Does every city has land area bigger than 100? => #isLandBigger
    city select => #selectcity
*/

/* RESET ACTION */
document.querySelector("#reset").addEventListener("click", () => {
    createTableElements(data, "allcities");
    createTableElements([], "singlecity")
});

/* START CODING HERE */

/* Initialization of DOM Elements */
const buttonGroup = document.querySelector(".btn-group-vertical");

const populationBigger = buttonGroup.querySelector("#populationBigger");
const landAreaLess = buttonGroup.querySelector("#landAreaLess");
const isPopulationLess = buttonGroup.querySelector("#isPopulationLess");
const isLandBigger = buttonGroup.querySelector("#isLandBigger");

const selectCity = document.querySelector("#selectcity");




/* Event Listeners for buttons */
populationBigger.addEventListener("click", () => {
  const populationBiggerCities = data.filter(city => city.population > 500000);
  createTableElements(populationBiggerCities, "allcities");
});

landAreaLess.addEventListener("click", () => {
  const landAreaLessCities = data.filter(city => city.landArea < 1000);
  createTableElements(landAreaLessCities, "allcities");
});

isPopulationLess.addEventListener("click", () => {
  const isPopulationLessCities = data.some(city => city.population < 100000);
  if(isPopulationLessCities) alert("Yes"); 
  else alert("No");
});

isLandBigger.addEventListener("click", () => {
  const isLandBiggerCities = data.every(city => city.landArea > 100);
  if(isLandBiggerCities) alert("Yes");
  else alert("No");
});


/* Polluting selectcity table with city names */
const cities = data.map(city => city.name);

const generateCityOption = (city) => {
  return `<option value="${city}">${city}</option>`
};

const resultHtml = cities.reduce((acc, city) => {
  return acc+generateCityOption(city);
}, "");
selectCity.innerHTML = resultHtml;

selectCity.addEventListener("change", () => {
  const selectedCity = selectCity.querySelector("option:checked");
  const city = [data.find(city => city.name === selectedCity.value)].flat();
  createTableElements(city, "singlecity");
});
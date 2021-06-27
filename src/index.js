// список импорта------------------------------
import './sass/main.scss';
import fetchCountries from './fetchCountries.js';
import { alert, defaultModules } from '../node_modules/@pnotify/core';


// ссылки на разметку------------------------------
const refs = {
    input: document.querySelector('input'),
    body: document.querySelector('body'),
    country: document.querySelector('container'),
}
console.log(refs.input)
console.log(refs.body)
console.log(refs.country)

const debounce = require('lodash.debounce');

let searchQuery = ''
console.log(searchQuery)

refs.input.addEventListener('input',  debounce(onInput,500))

function onInput() {

    searchQuery = refs.input.value;

    fetchCountries(searchQuery)
        .then((countries) => onResponse(countries));
}


//  1. вывести результат одной страницы

//  2. вывести результат список стран от 2 до 10 штук

//  3. если стран больше 10 - вывести "уточните параметры запроса"

// проверка на количество стран в промисе------------------------------
function onResponse (countries){
    if (countries.length > 10) {
     renderClarifyMessage(countries)
    } else if (countries.length >= 2 && countries.length <= 10) {
        renderCountriesMany(countries)
    } else if (countries.length===1){
        renderCountry(countries)
    } else {
       renderDefaultMessage()
  }
}
// если больше 10 стран-----------------------------
function renderClarifyMessage(countries) {

    // очистить контент

     alert({
    text: 'Notice me, senpai!'
     });
    console.log('renderClarifyMessage')
    console.log(countries)
}

// если от 2х до 10ти стран------------------------------
function renderCountriesMany(countries) {
    // очистить контент
    // вывести список стран
    console.log('renderCountriesMany')
    console.log(countries)
}
// если одна страна------------------------------
function renderCountry(countries) {
    // очистить контент
     // вывести картинку страны
    
    console.log('renderCountry')
    console.log(countries)
}
// //если ни одной страны---------------------------------
function renderDefaultMessage() {
    // очистить контент
   
    console.log('Такой страны не существует, уточните поиск')
    
}




//функция очистки контента-----------------------------

function clearContent() {
    refs.countryContainer.inner
}

// switch (true) {
    
//     case countries.length > 10:
//         renderClarifyMessage(countries);
//         break;
//      case countries.length >= 2 && countries.length <= 10:
//         renderCountriesMany(countries);
//         break;
//      case countries.length === 1:
//         renderCountry(countries);
//         break;
//     default:
//         renderDefaultMessage()

// }

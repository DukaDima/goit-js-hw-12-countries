// список импорта------------------------------
import './sass/main.scss';
import fetchCountries from './fetchCountries.js';
import { alert, defaultModules } from '../node_modules/@pnotify/core';
import countryOne from './templates/country.hbs';
import countryList from './templates/countryList.hbs'
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
  defaultModules.set(PNotifyMobile, {});

// ссылки на разметку------------------------------
const refs = {
    input: document.querySelector('input'),
    body: document.querySelector('body'),
    country: document.getElementById('container'),
}

const debounce = require('lodash.debounce');

let searchQuery = ''

refs.input.addEventListener('input',  debounce(onInput,500))

function onInput() {

    searchQuery = refs.input.value;

    fetchCountries(searchQuery)
        .then(onResponse);
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

    clearContent()

    alert({
    type: 'info',
        text: 'Уточни название страны!',
        delay: 2000,
        title: 'ПРИВЕТ'
     });
    console.log('renderClarifyMessage')
    console.log(countries)
}

// если от 2х до 10ти стран------------------------------
function renderCountriesMany(countries) {
    clearContent()
    // вывести список стран
    // console.log(countries)
    // console.log(countryList(countries))
    refs.country.insertAdjacentHTML ('beforeend', countryList(countries))
    // const list = countries.map((country) => country.name);
    // console.log(list)
    console.log('renderCountriesMany')
    
}
// если одна страна------------------------------
function renderCountry(countries) {
    clearContent()
     // вывести карточку страны
 
    refs.country.insertAdjacentHTML('beforeend', countryOne(countries))
    console.log(countries)
    // console.log('renderCountry')
    // console.log(countries)
}
// //если ни одной страны---------------------------------
function renderDefaultMessage() {
    clearContent()
    alert({
    type: 'error',
        text: 'Такой страны не существует!',
        delay: 2000,
        title: 'ИЗВИНИTE'
     });
    console.log('Такой страны не существует, уточните поиск')
    
}
//функция очистки контента-----------------------------

function clearContent() {
    refs.country.innerHTML=''
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

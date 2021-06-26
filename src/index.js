import './sass/main.scss';
console.log('homework 12')
import fetchCountries from './fetchCountries.js';

const refs = {
    input: document.querySelector('input'),
}

console.log(refs.input)
var debounce = require('lodash.debounce');

let searchQuery = ''
refs.input.addEventListener('input', onInput)

function onInput(e) {
  
   debounce((e) => {
          e.preventDefault()
    searchQuery=refs.input.value
        console.log(refs.input.value)
        console.log('debounce')
    return `${searchQuery}`
     
    },500)
 
  
}

const Countries = fetchCountries(searchQuery)
console.log(Countries)


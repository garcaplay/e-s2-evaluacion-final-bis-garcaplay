'use strict';

const radioSelector = document.querySelectorAll('.form__size-option');

const btnSelector = document.querySelector('.form__button');

const ulSelector = document.querySelector('.body__card-list');

let radioValue = '';

let radioID = '';

let preSelect = '';

let listNumber = '';

let liGenerator= '';

let imgGenerator = '';

let liSelector ='';

let imgSelector ='';

let pokeIDArray = [];

let pokeImageArray = [];

let pairCompareArray = [];

if(localStorage.getItem('radioID') !== null){
  preSelect = document.querySelector(`#${localStorage.getItem('radioID')}`),
  preSelect.checked = true;
}

function valueSelect(){
  for(let i=0; i<radioSelector.length; i++){
    if(radioSelector[i].checked === true){
      radioValue = radioSelector[i].value;
    }
  }
}

function generateLi(){

  ulSelector.innerHTML='';
  pokeIDArray = [];
  pokeImageArray = [];

  for(let i=0; i<radioSelector.length; i++){
    if(radioSelector[i].checked === true){
      radioValue = radioSelector[i].value;
      listNumber = parseInt(radioValue);

      radioID = radioSelector[i].id;
      localStorage.setItem('radioID', `${radioID}`);
    }
  }

  apiRequest(liGenerator, imgGenerator);
}

function apiRequest(liGenerator, imgGenerator){
  fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${radioValue}.json`)
    .then(response => response.json())
    .then(function(data){
      for(const poke of data){
        const pokeID = poke.pair;
        const pokeImage = poke.image;

        pokeIDArray.push(pokeID);
        pokeImageArray.push(pokeImage);
      }

      for (let i=0; i<listNumber; i++){

        liGenerator = document.createElement('li');

        liGenerator.classList.add('card-list__element', `${pokeIDArray[i]}`);
        liGenerator.id = `${[i]}`;

        imgGenerator = document.createElement('img');

        imgGenerator.classList.add('card-list__image', `${pokeIDArray[i]}`);

        imgGenerator.classList.add('bg-adalab');

        liGenerator.appendChild(imgGenerator);

        ulSelector.appendChild(liGenerator);
      }

      liSelector = document.querySelectorAll('.card-list__element');
      imgSelector = document.querySelectorAll('.card-list__image');

      for (let i=0; i<listNumber; i++){
        liSelector[i].addEventListener('click', turnPoke);
      }
    });
}

function turnPoke(){
  const imgClicked = this.querySelector('.card-list__image');
  if (imgClicked.src !== `${pokeImageArray[this.id]}`){
    imgClicked.src = `${pokeImageArray[this.id]}`;
    imgClicked.classList.remove('bg-adalab');
    pairCompareArray.push({pokemon:`${pokeIDArray[this.id]}`, position: `${this.id}`});
    setTimeout(pairCompare, 1500);
  } else {
    imgClicked.classList.add('bg-adalab');
    imgClicked.src= '../assets/images/noimage.png';
    pairCompareArray.pop();
  }
}

function pairCompare(){
  if(pairCompareArray.length >= 2){
    if(pairCompareArray[0].pokemon !== pairCompareArray[1].pokemon){
      imgSelector[`${pairCompareArray[0].position}`].classList.add('bg-adalab');
      imgSelector[`${pairCompareArray[1].position}`].classList.add('bg-adalab');
      pairCompareArray.splice(0, 2);
    } else {
      pairCompareArray.splice(0, 2);
    }
  }
}

btnSelector.addEventListener('click', () =>{
  valueSelect();
  generateLi();
});


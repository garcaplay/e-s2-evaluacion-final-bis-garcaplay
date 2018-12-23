'use strict';

//vamos a recoger el valor del radio seleccionado y a hacer que nos pinte las mismas listas que su valor
const radioSelector = document.querySelectorAll('.form__size-option');
let listNumber = '';
('.form__size-option');

const btnSelector = document.querySelector('.form__button');

const ulSelector = document.querySelector('.body__card-list');

function generateLi(){

  ulSelector.innerHTML='';

  for(let i=0; i<radioSelector.length; i++){
    if(radioSelector[i].checked === true){
      let radioValue = radioSelector[i].value;
      listNumber = parseInt(radioValue);
    }
  }

  for (let i=0; i<listNumber; i++){
    const liGenerator = document.createElement('li');

    liGenerator.classList.add('card-list__element');

    const imgGenerator = document.createElement('img');

    imgGenerator.classList.add('card-list__image');

    imgGenerator.src = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';

    liGenerator.appendChild(imgGenerator);

    ulSelector.appendChild(liGenerator);
  }

}

btnSelector.addEventListener('click', generateLi);

//Click sobre el botón de 'Comenzar'--> recogemos el valor del radio y se pone en la URL del API es https://raw.githubusercontent.com/Adalab/cards-data/master/NUMERO.json,//Guardamos el número seleccionado en LocalStorage para que al recargar la página aparezca seleccionado el que se usó la última vez
//Hacemos la petición al API y pintamos en la lista las imágenes
//Por defecto se verá solo la parte trasera de las cartas, cuando clickemos sobre una de ellas se verá la parte frontal (y viceversa -toggle-)

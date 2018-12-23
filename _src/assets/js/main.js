'use strict';

//vamos a desarrollar el código base para inyectar las listas
const btnSelector = document.querySelector('.form__button');

const ulSelector = document.querySelector('.body__card-list');

function generateLi(){

  const liGenerator = document.createElement('li');

  const textGenerator = document.createTextNode('blablabla');

  liGenerator.appendChild(textGenerator);

  liGenerator.classList.add('card-list__element');

  const imgGenerator = document.createElement('img');

  imgGenerator.classList.add('card-list__image');

  liGenerator.appendChild(imgGenerator);

  ulSelector.appendChild(liGenerator);

}

btnSelector.addEventListener('click', generateLi);


//<li class="card-list__element"><img class="card-list__image" src="https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB"></li>


//Click sobre el botón de 'Comenzar'--> recogemos el valor del radio y se pone en la URL del API es https://raw.githubusercontent.com/Adalab/cards-data/master/NUMERO.json,//Guardamos el número seleccionado en LocalStorage para que al recargar la página aparezca seleccionado el que se usó la última vez
//Hacemos la petición al API y pintamos en la lista las imágenes
//Por defecto se verá solo la parte trasera de las cartas, cuando clickemos sobre una de ellas se verá la parte frontal (y viceversa -toggle-)

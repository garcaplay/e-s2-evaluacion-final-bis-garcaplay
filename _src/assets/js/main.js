'use strict';

//vamos a llamar a la API, pidiéndole que ponga el valor seleccionado
//recogemos los datos que necesitamos (1. ID, 2. imagen)
//pintamos las imágenes que nos dan en la lista

const radioSelector = document.querySelectorAll('.form__size-option');

const btnSelector = document.querySelector('.form__button');

const ulSelector = document.querySelector('.body__card-list');

let radioValue = '';

function valueSelect(){
  for(let i=0; i<radioSelector.length; i++){
    if(radioSelector[i].checked === true){
      radioValue = radioSelector[i].value;
    }
  }
}

function generateLi(){

  ulSelector.innerHTML='';

  fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${radioValue}.json`)
    .then(response => response.json())
    .then(function(data){
      for(const poke of data){
        const pairID = poke.pair;
        const pokeImage = poke.image;

        const liGenerator = document.createElement('li');

        liGenerator.classList.add('card-list__element', `${pairID}`);

        const imgGenerator = document.createElement('img');

        imgGenerator.classList.add('card-list__image', `${pairID}`);

        imgGenerator.src = `${pokeImage}`;

        liGenerator.appendChild(imgGenerator);

        ulSelector.appendChild(liGenerator);
      }
    });
}

btnSelector.addEventListener('click', () =>{
  valueSelect();
  generateLi();
});


//Click sobre el botón de 'Comenzar'--> recogemos el valor del radio y se pone en la URL del API es https://raw.githubusercontent.com/Adalab/cards-data/master/NUMERO.json,//Guardamos el número seleccionado en LocalStorage para que al recargar la página aparezca seleccionado el que se usó la última vez
//Hacemos la petición al API y pintamos en la lista las imágenes
//Por defecto se verá solo la parte trasera de las cartas, cuando clickemos sobre una de ellas se verá la parte frontal (y viceversa -toggle-)

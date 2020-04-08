"use strict";
// este array se carga de forma asincrona mediante Ajax
//const endpoint = 'http://127.0.0.1:5500/js/data/personas.json';
const endpoint = 'http://localhost:8080/apprest/api/personas/';
let personas = [];


window.addEventListener('load', init() );

function init(){
    console.debug('Document Load and Ready');    
    listener();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        // recibimos la RESPONSE
        if (this.readyState == 4 && this.status == 200) {
            
            const jsonData = JSON.parse(this.responseText);    
            console.debug( jsonData );         
            personas = jsonData;
            pintarLista( personas );

        }// his.readyState == 4 && this.status == 200

    };// onreadystatechange
    xhttp.open("GET", endpoint , true);    
    xhttp.send();

    // CUIDADO!!!, es asincrono aqui personas estaria sin datos
    // pintarLista( personas );

}//init

/**
 * Inicializamos los listener de index.hml
 */
function listener(){

    let selectorSexo = document.getElementById('selectorSexo');
    let inputNombre = document.getElementById('inombre');



    selectorSexo.addEventListener('change', busqueda( selectorSexo.value, inputNombre.value ) );
    /*
    selectorSexo.addEventListener('change', function(){
        const sexo = selectorSexo.value;
        console.debug('cambiado select ' + sexo);
        if ( 't' != sexo ){
            const personasFiltradas = personas.filter( el => el.sexo == sexo );
            pintarLista(personasFiltradas);
        }else{
            pintarLista(personas);
        }    
    });
    */

    inputNombre.addEventListener('keyup', function(){
        const busqueda = inputNombre.value.toLowerCase();
        console.debug('tecla pulsada, valor input ' +  busqueda );
        if ( busqueda ){
            const personasFiltradas = personas.filter( el => el.nombre.toLowerCase().includes(busqueda));
            pintarLista(personasFiltradas);
        }else{
            pintarLista(personas);
        }    
    });


}

function pintarLista( arrayPersonas ){
    //seleccionar la lista por id
    let lista = document.getElementById('alumnos');
    lista.innerHTML = ''; // vaciar html 
    arrayPersonas.forEach( p => lista.innerHTML += `<li><img src="img/${p.avatar}" alt="avatar">${p.nombre}</li>` );
}


function busqueda( sexo = 't', nombreBuscar = '' ){

    console.info('Busqueda sexo %o nombre %o', sexo, nombreBuscar );
}

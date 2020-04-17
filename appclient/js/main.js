"use strict";
// este array se carga de forma asincrona mediante Ajax
//const endpoint = 'http://127.0.0.1:5500/js/data/personas.json';
const endpoint = 'http://localhost:8080/apprest/api/personas/';
let personas = [];


window.addEventListener('load', init() );

function init(){
    console.debug('Document Load and Ready');    

    listener();    
    initGallery();
    pintarLista();

}//init

/**
 * Inicializamos los listener de index.hml
 */
function listener(){

    let selectorSexo = document.getElementById('selectorSexo');
    let inputNombre = document.getElementById('inombre');

    selectorSexo.addEventListener('change', filtro );
    inputNombre.addEventListener('keyup',  filtro );


}

function pintarLista(){

    console.trace('pintarLista');

  
          
    const promesa = ajax("GET", endpoint, undefined);
    promesa
    .then( data => {
            console.trace('promesa resolve'); 
            personas = data;
            maquetarLista(personas);            
            
    }).catch( error => {
            console.warn('promesa rejectada');            
            alert(error);
    });

    
}


function maquetarLista(elementos){
    console.trace('maquetarLista');
    
    let lista = document.getElementById('alumnos');
    lista.innerHTML = ''; // vaciar html 

    elementos.forEach( (p,i) => 
        lista.innerHTML += `<li>
            <img src="${p.avatar}" alt="avatar">${p.nombre}
            <i class="fas fa-pencil-ruler" onclick="seleccionar(${i})"></i>
            <i class="fas fa-trash" onclick="eliminar(${i})"></i>
            </li>` );
}


function eliminar(indice){
    let personaSeleccionada = personas[indice];
    console.debug('click eliminar persona %o', personaSeleccionada);
    const mensaje = `¿Estas seguro que quieres eliminar  a ${personaSeleccionada.nombre} ?`;
    if ( confirm(mensaje) ){

        const url = endpoint + personaSeleccionada.id;
        ajax('DELETE', url, undefined)
            .then( data =>  pintarLista() )
            .catch( error => {
                console.warn('promesa rejectada');
                alert(error);
            });

    }

}
//TODO cambiar nombre
function seleccionar(indice){

    let  personaSeleccionada = { "id":0, "nombre": "sin nombre" , "avatar" : "avatar7.png", "sexo": "h" };

    if ( indice > -1 ){
        personaSeleccionada = personas[indice];
    }
    
    console.debug('click persona seleccionada %o', personaSeleccionada);
   
    //rellernar formulario
    document.getElementById('inputId').value = personaSeleccionada.id;
    document.getElementById('inputNombre').value = personaSeleccionada.nombre;    
    document.getElementById('inputAvatar').value = personaSeleccionada.avatar;

    //seleccionar Avatar
    const avatares = document.querySelectorAll('#gallery img');
    avatares.forEach( el => {
        el.classList.remove('selected');
        if ( "img/"+personaSeleccionada.avatar == el.dataset.path ){
            el.classList.add('selected');
        }
    });

   
    const sexo = personaSeleccionada.sexo;
    let checkHombre = document.getElementById('sexoh');
    let checkMujer = document.getElementById('sexom');

    if ( sexo == "h"){
        checkHombre.checked = 'checked';
        checkMujer.checked = '';

    }else{
        checkHombre.checked = '';
        checkMujer.checked = 'checked';
    }


}

function guardar(){

    console.trace('click guardar');
    let id = document.getElementById('inputId').value;
    let nombre = document.getElementById('inputNombre').value;
    let avatar = document.getElementById('inputAvatar').value;
   
   //sexo, si no esta marcado el de hombre, sera mujer
   let sexo = (document.getElementById('sexoh').checked ) ? 'h' : 'm';
    
    let persona = {
        "id" : id,
        "nombre" : nombre,
        "avatar" : avatar,
        "sexo" : sexo
    };

    console.debug('persona a guardar %o', persona);

    //CREAR
    if ( id == 0 ){ 
        console.trace('Crear nueva persona');
       
        ajax('POST',endpoint, persona)
            .then( data => {                
                alert( persona.nombre + ' ya esta con nosotros ');
                //limpiar formulario
                document.getElementById('inputId').value = 0;
                document.getElementById('inputNombre').value = '';               
                document.getElementById('inputAvatar').value = 'img/avatar1.png';
                document.getElementById('sexoh').checked = true;
                document.getElementById('sexom').checked = false;

                pintarLista();
            })
            .catch( error => {
                console.warn('promesa rejectada %o', error);
                alert(error.informacion);
            });
        

    // MODIFICAR
    }else{
        console.trace('Modificar persona');

        const url = endpoint + persona.id;
        ajax('PUT', url , persona)
            .then( data => {
                alert( persona.nombre + ' modificado con exito ');
                pintarLista();
            })
            .catch( error => {
                console.warn('No se pudo actualizar %o', error);
                alert(error.informacion);
            });
        
    }

   

}

function filtro(){

    let selectorSexo = document.getElementById('selectorSexo');
    let inputNombre = document.getElementById('inombre');

    const sexo = selectorSexo.value;
    const nombre = inputNombre.value.trim().toLowerCase();;

    console.trace(`filtro sexo=${sexo} nombre=${nombre}`);
    console.debug('personas %o',personas);

    //creamos una copia para no modificar el original
    let personasFiltradas = personas.map( el => el);

    //filtrar por sexo, si es 't' todos no hace falta filtrar
    if ( sexo == 'h' || sexo == 'm'){
        personasFiltradas = personasFiltradas.filter(el => el.sexo == sexo );
        console.debug('filtrado por sexo %o', personasFiltradas);
    }

    //filtrar por nombre buscado
    if ( nombre != " "){
        personasFiltradas = personasFiltradas.filter(el => el.nombre.toLowerCase().includes(nombre) );
        console.debug('filtrado por nombre %o', personasFiltradas);
    }


    maquetarLista(personasFiltradas);

}


/**
 * Carga todas las imagen de los avatares
 */
function initGallery(){
    let divGallery =  document.getElementById('gallery');
    for ( let i = 1; i <= 7 ; i++){
        divGallery.innerHTML += `<img onclick="selectAvatar(event)" 
                                      class="avatar" 
                                      data-path="img/avatar${i}.png"
                                      src="img/avatar${i}.png">`;
    }
}

function selectAvatar(evento){
    console.trace('click avatar');
    const avatares = document.querySelectorAll('#gallery img');
    //eliminamos la clases 'selected' a todas las imagenes del div#gallery
    avatares.forEach( el => el.classList.remove('selected') );
    // ponemos clase 'selected' a la imagen que hemos hecho click ( evento.target )
    evento.target.classList.add('selected');

    let iAvatar = document.getElementById('inputAvatar');
    //@see: https://developer.mozilla.org/es/docs/Learn/HTML/como/Usando_atributos_de_datos
    iAvatar.value = evento.target.dataset.path;

}
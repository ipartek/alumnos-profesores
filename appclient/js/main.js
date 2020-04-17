"use strict";

//VARIABLES GLOBALES

//const endpoint = 'http://127.0.0.1:5500/js/data/personas.json';
const endpoint = 'http://localhost:8080/apprest/api/personas/';
let personas = [];


window.addEventListener('load', init() );

/**
 * Se ejecuta cuando todo esta cargado
 */
function init(){
    console.debug('Document Load and Ready');    

    listener();    
    initGallery();
    pintarLista();

}//init


/**
 * Inicializamos los listener de index.hml
 * para el selector de sexo y busqueda por nombre
 * @see function filtro
 */
function listener(){

    let selectorSexo = document.getElementById('selectorSexo');
    let inputNombre = document.getElementById('inombre');

    selectorSexo.addEventListener('change', filtro );
    inputNombre.addEventListener('keyup',  filtro );

}// listener


/**
 * Filtra las personas cuando se buscan por sexo y nombre
 */
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

}// filtro


/**
 * Obtiene los datos del servicio rest y pinta la lista de Alumnos
 */
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

    
}// pintarLista


/**
 * Maqueta el listado de Alumnos
 * @param {*} elementos alumnos a pintar
 */
function maquetarLista(elementos){
    console.trace('maquetarLista');
    
    let lista = document.getElementById('alumnos');
    lista.innerHTML = ''; // vaciar html 

    elementos.forEach( (p,i) => 
        lista.innerHTML += 
            `<li>
                <img src="${p.avatar}" alt="avatar">${p.nombre}
                <i class="fas fa-trash" onclick="eliminar(${i})"></i>
                <i class="fas fa-pencil-ruler" onclick="seleccionar(${i})"></i>            
            </li>` 
    );
} //maquetarLista


/**
 * Se ejecuta al pulsar el boton de la papeleray llama al servicio rest para DELETE
 * @param {*} indice posicion del alumno dentro del array personas
 */
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
} // eliminar


/**
 * Se ejecuta al pulsar el boton de editar(al lado de la papelera) o boton 'Nueva Persona' 
 * Rellena el formulario con los datos de la persona
 * @param {*} indice posicion del alumno dentro del array personas, si no existe en el array usa personaSeleccionada
 * @see personaSeleccionada = { "id":0, "nombre": "sin nombre" , "avatar" : "img/avatar7.png", "sexo": "h" };
 */
function seleccionar(indice){

    let  personaSeleccionada = { "id":0, "nombre": "sin nombre" , "avatar" : "img/avatar7.png", "sexo": "h" };

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

} // seleccionar


/**
 * Llama al servicio Rest para hacer un POST ( id == 0) o PUT ( id != 0 )
 */
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

}// guardar




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

/**
 * Selecciona el avatar sobre el que se ha hecho el evento click
 * @param {*} evento 
 */
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
"use strict";
// este array se carga de forma asincrona mediante Ajax
const endpoint = 'http://127.0.0.1:5500/js/data/personas.json';
//const endpoint = 'http://localhost:8080/apprest/api/personas/';
let personas = [];


window.addEventListener('load', init() );

function init(){
    console.debug('Document Load and Ready');    
    listener();

    const promesa = ajax("GET", endpoint, undefined);
    promesa
    .then( data => {
            console.trace('promesa resolve'); 
            personas = data;
            pintarLista( personas );

    }).catch( error => {
            console.warn('promesa rejectada');
            alert(error);
    });

    console.debug('continua la ejecuion del script de forma sincrona');
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
    arrayPersonas.forEach( (p,i) => lista.innerHTML += `<li>
                                                            <img src="img/${p.avatar}" alt="avatar">${p.nombre}
                                                            <i class="fas fa-pencil-ruler" onclick="seleccionar(${i})"></i>
                                                            <i class="fas fa-trash" onclick="eliminar(${i})"></i>
                                                         </li>` );
}

function eliminar(indice){
    let personaSeleccionada = personas[indice];
    console.debug('click eliminar persona %o', personaSeleccionada);
    const mensaje = `¿Estas seguro que quieres eliminar  a ${personaSeleccionada.nombre} ?`;
    if ( confirm(mensaje) ){

        //TODO mirar como remover de una posicion
        //personas = personas.splice(indice,1);
        personas = personas.filter( el => el.id != personaSeleccionada.id) 
        pintarLista(personas);
        //TODO llamada al servicio rest

    }

}

function seleccionar(indice){

    let  personaSeleccionada = { "id":0, "nombre": "sin nombre" };

    if ( indice != 0 ){
        personaSeleccionada = personas[indice];
    }
    
    console.debug('click guardar persona %o', personaSeleccionada);
   
    //rellernar formulario
    document.getElementById('inputId').value = personaSeleccionada.id;
    document.getElementById('inputNombre').value = personaSeleccionada.nombre;
   
}

function guardar(){

    console.trace('click guardar');
    let id = document.getElementById('inputId').value;
    let nombre = document.getElementById('inputNombre').value;

    let persona = {
        "id" : id,
        "nombre" : nombre,
        "avatar" : "avatar7.png"
    };

    console.debug('persona a guardar %o', persona);

    //TODO llamar servicio rest

    personas.push(persona);
    pintarLista(personas);

}

function busqueda( sexo = 't', nombreBuscar = '' ){

    console.info('Busqueda sexo %o nombre %o', sexo, nombreBuscar );
}

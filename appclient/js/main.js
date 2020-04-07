// fichero javascript para app
const personas = [
    {
        "nombre" : "Oconnor",
        "avatar" : "img/avatar1.png",
        "sexo"   : "h"
    },
    {
        "nombre" : "Pepa",
        "avatar" : "img/avatar2.png",
        "sexo"   : "m"
    },
    {
        "nombre" : "JoseMAri",
        "avatar" : "img/avatar3.png",
        "sexo"   : "h"
    }
];


window.addEventListener('load', init() );

function init(){
    console.debug('Document Load and Ready');    
    listener();

    //TODO llamada Ajax al servicio Rest, Cuidado es ASINCRONO!!!!!
    pintarLista( personas );

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
    arrayPersonas.forEach( p => lista.innerHTML += `<li><img src="${p.avatar}" alt="avatar">${p.nombre}</li>` );
}


function busqueda( sexo = 't', nombreBuscar = '' ){

    console.info('Busqueda sexo %o nombre %o', sexo, nombreBuscar );
}

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
    // es importante esperar que todo este cragando para comenzar
    const personasFiltradas = personas.filter( el => el.sexo == "m" ) ;
    pintarLista( personasFiltradas );

}//init


function pintarLista( arrayPersonas ){
    //seleccionar la lista por id
    let lista = document.getElementById('alumnos');
    lista.innerHTML = ''; // vaciar html 
    arrayPersonas.forEach( p => lista.innerHTML += `<li><img src="${p.avatar}" alt="avatar">${p.nombre}</li>` );
}


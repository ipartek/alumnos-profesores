// fichero javascript para app

window.addEventListener('load', init() );

function init(){
    console.debug('Document Load and Ready');
    // es importante esperar que todo este cragando para comenzar

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


    //seleccionar la lista por id
    let lista = document.getElementById('alumnos');
    lista.innerHTML = ''; // vaciar html 

    /*
    for(let i=0; i < personas.length; i++){
        const persona = personas[i];
        lista.innerHTML += `<li><img src="${persona.avatar}" alt="avatar">${persona.nombre}</li>`;
    }*/

    personas.forEach( p => lista.innerHTML += `<li><img src="${p.avatar}" alt="avatar">${p.nombre}</li>` );


}//init

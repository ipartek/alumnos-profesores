"use strict";

//VARIABLES GLOBALES

//const endpoint = 'http://127.0.0
const endpoint = 'http://localhost:8080/apprest/api/';
let personas = [];
let cursos = [];
let personaSeleccionada = { "id":0, 
                            "nombre": "sin nombre" , 
                            "avatar" : "img/avatar7.png", 
                            "sexo": "h",
                            "cursos": []
                          };

window.addEventListener('load', init() );

/**
 * Se ejecuta cuando todo esta cargado
 */
function init(){
    console.debug('Document Load and Ready');    

    listener();    
    initGallery();
    cargarAlumnos();
    
    // mejor al mostrar la modal
    // cargarCursos();

}//init


/**
 * Inicializamos los listener de index.hml
 * 1) selector de sexo y busqueda por nombre
 * 2) filtro de cursos 
 * 3) modal
 * 4) filtro para buscar persona por nombre
 * @see function filtro
 */
function listener(){

    // 1
    let selectorSexo = document.getElementById('selectorSexo');
    let inputNombre = document.getElementById('inombre');

    selectorSexo.addEventListener('change', filtro );
    inputNombre.addEventListener('keyup',  filtro );

    // 2 filtro de cursos
    let filtroCursos = document.getElementById('filtroCurso');
    filtroCursos.addEventListener('keyup',  function(event) {
        let filtroValor = filtroCursos.value.trim();        
        if ( filtroValor.length >= 3 ){
            console.debug('filtroCursos keyup ' + filtroValor );
            cargarCursos(filtroValor);
        }else{
            cargarCursos();
        }

    });
    


    // 3 Modal
    
    var modal = document.getElementById("modal");
    var btn = document.getElementById("btnModal");    
    var spanClose = document.getElementById("close");

    // When the user clicks the button, open the modal 
    btn.onclick = () =>  {
        cargarCursos();
        modal.style.display = "block";
        modal.classList.add('animated','zoomIn');
    }

    // When the user clicks on <span> (x), close the modal
    spanClose.onclick = () => {
        modal.style.display = "none";        
    }    
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";            
        }
    }


    // 4 filtro buscar persona por nombre
    let iNombre = document.getElementById('inputNombre');
    let nombreMensaje = document.getElementById('nombreMensaje');

    iNombre.addEventListener('keyup',  () =>{
        console.debug('tecla pulsada ' + iNombre.value);

        if ( personaSeleccionada.nombre != iNombre.value ){

            const url = endpoint + 'personas/?filtro=' + iNombre.value;
            ajax('GET', url, undefined)
                .then( ( data ) => {
                    console.debug('Nombre NO disponible');
                    nombreMensaje.textContent = 'Nombre NO disponible';
                    nombreMensaje.classList.add('invalid');
                    nombreMensaje.classList.remove('valid');
                })
                .catch( ( error ) => {
                    console.debug('Nombre disponible');
                    nombreMensaje.textContent = 'Nombre disponible';
                    nombreMensaje.classList.add('valid');
                    nombreMensaje.classList.remove('invalid');
                });
        }     

    

    });




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
 * Carga todos los cursos
 * @param {*} filtro por nombre de curso, busca coincidencias
 */
function cargarCursos( filtro = '' ){
    console.trace('cargar cursos');   
    const url = endpoint + 'cursos/?filtro=' + filtro;
    ajax( 'GET', url, undefined )
        .then( data => {
             cursos = data;
             // cargar cursos en lista
             let lista = document.getElementById('listaCursos');
             lista.innerHTML = '';
             cursos.forEach( el => 
                lista.innerHTML += `<li>
                                        <img src="${el.imagen}" alt="${el.nombre}">
                                        <h3>${el.nombre}</h3>
                                        <span>${el.precio} €</span>
                                        <span onClick="asignarCurso( 0, ${el.id})" >[x] Asignar</span>
                                    </li>` 
            );
            seleccionar(personaSeleccionada.id);   

        })
        .catch( error => alert('No se pueden cargar cursos' + error));
}//cargarCursos


/**
 * Obtiene los datos del servicio rest y pinta la lista de Alumnos
 */
function cargarAlumnos(){

    console.trace('cargarAlumnos');
    const url = endpoint + 'personas/';
    const promesa = ajax("GET", url , undefined);
    promesa
    .then( data => {
            console.trace('promesa resolve'); 
            personas = data;
            maquetarLista(personas);            
            
    }).catch( error => {
            console.warn('promesa rejectada');            
            alert("Lo sentimos pero no funciona la conexión.");
    });

    
}// cargarAlumnos


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
                <img src="${p.avatar}" alt="avatar">
                ${p.nombre}
                <span class="fright" >${p.cursos.length} cursos</span>
                <i class="fas fa-trash" onclick="eliminar(${p.id})"></i>
                <i class="fas fa-pencil-ruler" onclick="seleccionar(${p.id})"></i>            
            </li>` 
    );
} //maquetarLista


/**
 * Se ejecuta al pulsar el boton de la papeleray llama al servicio rest para DELETE
 * @param {*} id id del alumno
 */
function eliminar( id = 0){
    personaSeleccionada = personas.find( el => el.id == id);
    console.debug('click eliminar persona %o', personaSeleccionada);
    const mensaje = `¿Estas seguro que quieres eliminar  a ${personaSeleccionada.nombre} ?`;
    if ( confirm(mensaje) ){

        const url = endpoint + 'personas/' + personaSeleccionada.id;
        ajax('DELETE', url, undefined)
            .then( data =>  cargarAlumnos() )
            .catch( error => {
                console.warn('promesa rejectada %o', error );
                alert(error.informacion);
            });

    }
} // eliminar


/**
 * 
 * Se ejecuta al pulsar el boton de editar(al lado de la papelera) o boton 'Nueva Persona' 
 * Rellena el formulario con los datos de la persona
 * @param {*} id  id del alumno, si no existe en el array usa personaSeleccionada
 * @see personaSeleccionada = { "id":0, "nombre": "sin nombre" , "avatar" : "img/avatar7.png", "sexo": "h" };
 */
function seleccionar( id = 0 ){


    let cntFormulario = document.getElementById('content-formulario');
    cntFormulario.style.display = 'block';
    cntFormulario.classList.add('animated','fadeInRight');

    // para buscar por indice usar find
    personaSeleccionada = personas.find( el=> el.id == id);
    if ( !personaSeleccionada ){
        personaSeleccionada = { "id":0, 
                                "nombre": "sin nombre" , 
                                "avatar" : "img/avatar7.png", 
                                "sexo": "h",
                                "cursos": []
                             };
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

    // pintar cursos del alumno
    let listaCursosAlumno = document.getElementById('cursosAlumno');
    listaCursosAlumno.innerHTML = '';
    personaSeleccionada.cursos.forEach( el => {

        listaCursosAlumno.innerHTML += `<li>
                                            <img src="${el.imagen}" class="imagen-50" alt="imagen curso">
                                            ${el.nombre}
                                            <i class="fas fa-trash" onclick="eliminarCurso(event, ${personaSeleccionada.id},${el.id})"></i>
                                        </li>`;

    });



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
        const url = endpoint + 'personas/';
        ajax('POST',url , persona)
            .then( data => {                
                alert( persona.nombre + ' ya esta con nosotros ');
                //limpiar formulario
                document.getElementById('inputId').value = 0;
                document.getElementById('inputNombre').value = '';               
                document.getElementById('inputAvatar').value = 'img/avatar1.png';
                document.getElementById('sexoh').checked = true;
                document.getElementById('sexom').checked = false;

                cargarAlumnos();
            })
            .catch( error => {
                console.warn('promesa rejectada %o', error);
                alert(error.informacion);
            });
        

    // MODIFICAR
    }else{
        console.trace('Modificar persona');

        const url = endpoint + 'personas/' + persona.id;
        ajax('PUT', url , persona)
            .then( data => {
                alert( persona.nombre + ' modificado con exito ');
                cargarAlumnos();
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

/**
 * 
 * @param {*} idPersona 
 * @param {*} idCurso 
 */
function eliminarCurso(event, idPersona, idCurso ){

    console.debug(`click eliminarCurso idPersona=${idPersona} idCurso=${idCurso}`);

    const url = endpoint + 'personas/' + idPersona + "/curso/" + idCurso;
    ajax('DELETE', url, undefined)
    .then( data => {       
       //  event.target.parentElement.style.display = 'none';
       event.target.parentElement.classList.add('animated', 'bounceOut');        
       cargarAlumnos();        
    })
    .catch( error => alert(error));

}//eliminarCurso


/**
 * 
 * @param {*} idPersona 
 * @param {*} idCurso 
 */
function asignarCurso( idPersona = 0, idCurso ){

    idPersona = (idPersona != 0) ? idPersona : personaSeleccionada.id;

    console.debug(`click asignarCurso idPersona=${idPersona} idCurso=${idCurso}`);

    const url = endpoint + 'personas/' + idPersona + "/curso/" + idCurso;
    ajax('POST', url, undefined)
    .then( data => {

        // cerrar modal
        document.getElementById("modal").style.display = 'none';    

       // alert(data.informacion);

        const curso = data.data;
        // pintar curso al final de la lista        
        let lista = document.getElementById('cursosAlumno');        
        lista.innerHTML += `<li class="animated bounceIn">  
                                <img src="${curso.imagen}" class="imagen-50" alt="imagen curso">
                                ${curso.nombre}
                                <i class="fas fa-trash" onclick="eliminarCurso(event, ${idPersona},${curso.id})"></i>    
                            </li>`;
        //lista.classList.add('animated', 'bounceIn', 'delay-1s');                            
        
        cargarAlumnos();
        
    })
    .catch( error => alert(error));

}//asignarCurso






window.addEventListener('load', init() );

function init(){
    console.debug('Document Load and Ready');
    pintarLista();

}; // init   


function pintarLista(){
    const urlLista = 'https://pokeapi.co/api/v2/pokemon/';
    console.trace('pintarLista');
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {
        
            // parsear texto a Json
            const jsonData = JSON.parse(this.responseText);    
            console.debug( jsonData );

            // array con personas
            const pokemons = jsonData.results;

            let lista = document.getElementById('lista');
            lista.innerHTML = '';

            pokemons.forEach( el => {
                lista.innerHTML += `<li onclick="detallePokemon('${el.name}')" 
                                        class="list-group-item">${el.name}</li>`;
            });


        }// his.readyState == 4 && this.status == 200

    };// onreadystatechange

    xhttp.open("GET", urlLista , true);
    xhttp.send();


    


}// pintarLista

function detallePokemon( nombre ){

    console.trace(`detallePokemon ${nombre}`);
    const urlDetalle = `https://pokeapi.co/api/v2/pokemon/${nombre}/`;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {
            const jsonData = JSON.parse(this.responseText);    
            console.debug( jsonData );

            let elNombre = document.getElementById('pokemonNombre');
            elNombre.textContent = jsonData.name;
           
            let elImagen = document.getElementById('pokemonImagen');
            elImagen.src = jsonData.sprites.front_default;



        }// his.readyState == 4 && this.status == 200

    };// onreadystatechange

    xhttp.open("GET", urlDetalle , true);
    xhttp.send();

   

}//detallePokemon
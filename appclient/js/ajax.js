
/**
 * llamada ajax en vanilla javascript
 * @param {*} metodo 
 * @param {*} url 
 * @param {*} datos 
 * @return Promise
 */
function ajax( metodo, url, datos ){

    return new Promise( (resolve, reject ) => {

        console.debug(`promesa ajax metodo ${metodo} - ${url}` );
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 ) {

                if ( this.status == 200 ){
                    
                    const jsonData = JSON.parse(this.responseText);    
                    console.debug( jsonData );

                    // funciona promesa
                    resolve(jsonData);
                }else{
                    // falla promesa
                    reject( Error( this.status ));
                }               
            }

        };// onreadystatechange

        xhttp.open( metodo , url , true);
        xhttp.send();
    });
}
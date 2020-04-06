
/**
 * llamada ajax en vanilla javascript
 * @param {*} metodo 
 * @param {*} url 
 * @param {*} datos 
 */
function ajax( metodo, url, datos ){


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 ) {
            const jsonData = JSON.parse(this.responseText);    
            console.debug( jsonData );
            return ( [this.status, jsonData ] );


        }// his.readyState == 4 && this.status == 200

    };// onreadystatechange

    xhttp.open( metodo , url , true);
    xhttp.send();
}
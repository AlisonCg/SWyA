/*
vamos a crear una funcion con el uso de JS6
que se encargue del cifrado y descifrado del texto de area
considerando utilizar funciones anonimas y callback
*/

//evitar mayusculas
window.addEventListener("load", may, true);

function may(){
    document.getElementById("cadena").addEventListener("keyup", function(){
        this.value = this.value.toLowerCase(); 
    });
}

//punto
function punto(event) {
  
    var e = event || window.event;
    var key = e.keyCode || e.which;

    if ( key === 110 || key === 190 || key === 188 ) {     
        
       e.preventDefault();     
    }
}

//cero
function cero(e){
    var valor = e.value.replace(/^0*/, '');
    e.value = valor;
 }

//solo letras
function soloLetras(e) {
    var key = e.keyCode || e.which,
      tecla = String.fromCharCode(key).toLowerCase(),
      letras = " abcdefghijklmnñopqrstuvwxyz",
      especiales = [8, 37, 39, 46],
      tecla_especial = false;

    for (var i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      return false;
    }
  }

var cesar = cesar || (function(){
    //tenemos que entender que para poder cifrar o descifrar
    //es necesario obtener 3 parametros
    //txt, desp, action

    var doStaff = function(txt, desp, action){
    
        var replace = (function(){
            //necesito un alfabeto
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 
            'v', 'w', 'x', 'y', 'z'];

        var l = abc.length;
        //tenemos que crear una funcion que se encargue de poder realizar
        //el cambio de las posiciones de las letras para el
        //cifrado

        return function(c){

            var i = abc.indexOf(c.toLowerCase());

            //reemplazo de las posiciones o el movimiento
            //primero tenemos que saber si el texto esta vacio

            if(i != -1){

                //movimiento de las posiciones
                var pos = i;
                if(action){
                    //cifrar

                    if((pos+desp%l)>=l){ //l=27
                        pos = (pos+desp%l)-l;
                    } else {
                        pos = pos + desp%l;
                    }

                }else{
                    //descifrando

                    if((pos-desp%l)<0){
                        pos = (pos-desp%l) + l;
                    } else {
                        pos = pos - desp%l;
                    }
                }
                return abc[pos];
            }
            return c;
        };

    })();

    //vamos a necesitar regresar el reemplazo de la cadena
    //pero primero hay que verificarlo

    var re = (/[a-z\u00f1]/ig); //ñ es \u00f1

    return String(txt).replace(re, function(macth){

        //se encarga de buscar las coincidencias entre la
        //expresion regular y el textarea
        return replace(macth);
    });
    
    };

    //necesito enviar si vamos a cifrar o descifrar
    return {

        //el caso para cuando cifras
        encode : function(txt, desp){
            return doStaff(txt, desp, true);
        },
        decode : function(txt, desp){
            return doStaff(txt, desp, false);
        }
    };

})();

//crear las funciones codificar y decodificar
function codificar(){
    document.getElementById("resultado").innerHTML = 
    cesar.encode(document.getElementById("cadena").value, document.getElementById("posicion").value);
}

function decodificar(){
    document.getElementById("resultado").innerHTML = 
    cesar.decode(document.getElementById("cadena").value, document.getElementById("posicion").value);
}
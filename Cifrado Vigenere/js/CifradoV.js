//evitar mayusculas
window.addEventListener("load", may, true);

function may(){
    document.getElementById("mensaje").addEventListener("keyup", function(){
        this.value = this.value.toLowerCase(); 
    });

    document.getElementById("clave").addEventListener("keyup", function(){
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

//Funciones
const abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

let cadena = document.getElementById("mensaje");
let resultado = document.getElementById("resultado");
let cifrar = document.getElementById("cifrar");
let decifrar = document.getElementById("descifrar");
let palabraClave = document.getElementById("clave");

cifrar.addEventListener("click", () => {
    CifrarM(cadena.value, palabraClave.value);
});

decifrar.addEventListener("click", () => {
    DescifrarM(cadena.value, palabraClave.value);
});

function CifrarM(mensaje, clave) {
    const Clave = generarArrayClave(mensaje, clave);
    const Cifrado = [];

    for(let j = 0; j < mensaje.length; j++) {
        if(mensaje[j] == " ") {
            Cifrado.push(" ");
        }else if(mensaje[j] == ".") {
            Cifrado.push(".");
        }else if(mensaje[j] == ","){
            Cifrado.push(",");
        }else if(isNaN(mensaje[j])) {
            let indiceLetra1 = buscarIndiceLetra("cifrar", mensaje[j]);
            let indiceLetra2 = buscarIndiceLetra("cifrar", Clave[j]);
            let letraFinal = indiceLetra1 + indiceLetra2;

            if(letraFinal > abc.length - 1) {
                while(letraFinal > abc.length - 1) {
                    letraFinal -= abc.length;
                };
            };
            Cifrado.push(abc[letraFinal]);
        };
    };
    return resultado.innerHTML = Cifrado.join("");
};

function DescifrarM(mensaje, clave) {
    const Clave = generarArrayClave(mensaje, clave);
    const arrDecifrado = [];

    for(let k = 0; k < mensaje.length; k++) {
        if(mensaje[k] == " ") {
            arrDecifrado.push(" ");
        }else if(mensaje[k] == ".") {
            Decifrado.push(".");
        }else if(mensaje[k] == ","){
            Decifrado.push(",");
        }else if(isNaN(mensaje[k])) {
            let indiceLetra1 = buscarIndiceLetra("decifrar", mensaje[k]);
            let indiceLetra2 = buscarIndiceLetra("decifrar", Clave[k]);
            let letraFinal = indiceLetra1 - indiceLetra2;
            
            if(letraFinal < 0) {
                while(letraFinal < 0) {
                    letraFinal = abc.length - Math.abs(letraFinal);
                };
            };
            arrDecifrado.push(abc[letraFinal]);
        };
    };

    return resultado.innerHTML = arrDecifrado.join("");
};

//Array de la misma longitud del mensaje pero repitiendo la palabra clave
function generarArrayClave(string, key) {
    let contador = 0;
    let code = [];

    for(let i = 0; i < string.length; i++) {
        if(contador > key.length - 1) {
            contador = 0;
        };

        if(string[i] == " ") {
            code.push(" ");
            contador--;
        }else if(string[i] == ".") {
            code.push(".");
            contador--;
        }else if(string[i] == ","){
            code.push(",");
            contador--;
        }else if(isNaN(string[i])) {
            code.push(key[contador]);
        }else if(!isNaN(string[i])) {
            code.push(key[contador]);
        };

        contador++;
    };

    return code;
};

function buscarIndiceLetra(op, letra) {
    let i;
    
    abc.map((letraArr, indice) => {
        if(op == "cifrar") {
            if(letra.toLowerCase() == letraArr) {
                i = indice;
            };
        }else if(op == "decifrar") {
            if(letra.toLowerCase() == letraArr) {
                i = indice;
            };
        };
    });
    
    if(i > abc.length - 1) {
        i = i - abc.length
    }else if(i < 0) {
        i = abc.length - Math.abs(i);
    };

    return i;
};
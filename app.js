/*se trabajará mas entre la interaccion del html y el javascript*/
//01 trabajo con el titulo y mensajes 

//     let titulo = document.querySelector('h1');   //es como crear un puente entre el html y java


//querySelector permite acceder a cada uno de los elementos del html, luego podemos trabajar directamente con esa variable

// titulo.innerHTML = 'Juego del Número Secreto'
//let parrafo = document.querySelector('p');
//parrafo.innerHTML = 'Indica un número entre el 1 y 10.' 

//*creamos la variable para el numero secreto
let numeroSecreto = 0;

//*creamos la variable para el contador de intentos
let intentos = 0;

//*decralaramos la lista de numeros sorteados por el aleatorio
let listaNumerosSorteados = [];

//*creamos una variable para el numero maximo, y de esa manera evitar la recursividad
let numeroMaximo = 10;

//#01para reducir codigo mediante funciones, para utilizarlas n veces 
function asignarTextoElemento (elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto; 
    return;
}

/*02 trabajo con los botones (utilizamos la palabra reservada -function)
getElementById = ayuda a obtener los valores que coloca el usuario */
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos == 1) ? 'vez' : 'veces'} felicidades`);
        //para remover el 'disabled' del seugundo boton 
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El numero secreto es menor');
        } else {
            asignarTextoElemento('p', 'El numero secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

//*03generamos el numero secreto
function generarNumeroSecreto () {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    
    //si ya sorteamos todos los valores, el juego queda terminado
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles');
    } else {
        //si el numero generado esta en la lista, utilizamos otro numero
        //utilizamos la funcion 'includes'
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

//*04 funcion limpiar la caja de entrada de valores
function limpiarCaja() {
    //el querySelector es mas general que el getElementById, por ello es que necesita el #
    document.querySelector('#valorUsuario').value = '';
    
}


function condicionesInciales() {
    //utilizamos los elementos de la funcion
    asignarTextoElemento('h1', 'Bienvenido al juego del numero secreto');
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}.`);
    numeroSecreto = generarNumeroSecreto();
    intentos=1;
}

//*05 funcion para reiniciar juego una vez finalizada
/*por tanto, se debe limpiar la caja 
indicar mensaje de intervalo de numeros
generar el numero aleatorio
deshabilitar el boton de nuevo juego
iniciar el numero de intentos 
*/

function reiniciarJuego(){
    limpiarCaja();
    condicionesInciales();
    //deshabilitamos la funcion que habilitamos anteriormente
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesInciales();





let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 100;

console.log(numeroSecreto);

function asignarTextoaElementos(título, texto){
    let elementosHTML = document.querySelector(título);
    elementosHTML.innerHTML = texto;
    return;
}

function imagenBienvenida(){
    document.querySelector('.container__imagen-persona').src = 'img/goku alegre.png';
}

function imagenAcertó(){
    document.querySelector('.container__imagen-persona').src = 'img/goku like.png';
}

function imagenNoAcerto(){
    document.querySelector('.container__imagen-persona').src = 'img/goku enojado.png';
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if(!isNaN(numeroDeUsuario)){
        if (numeroDeUsuario === numeroSecreto){
            asignarTextoaElementos('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!!`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            imagenAcertó();
        } else {
            imagenNoAcerto();
            //El usuario no acertó
            if (numeroDeUsuario > numeroSecreto){
                asignarTextoaElementos('p', 'El número secreto es menor.');
            } else {
                asignarTextoaElementos('p', 'El número secreto es mayor.');
            }
            intentos++;
            limpiarRecuadro();
        }
        return;
    }
}

function limpiarRecuadro(){
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoaElementos('p', 'Ya se sortearon todos los números posibles')
    } else{
        //Si en la lista está incluido el numeroGenerado
        if(listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        } else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales(){
    asignarTextoaElementos('h1','Juego The Secret Number!!!');
    asignarTextoaElementos('p',`Indique un número del 1 al ${numeroMaximo}:`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){
    limpiarRecuadro();
    imagenBienvenida();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();
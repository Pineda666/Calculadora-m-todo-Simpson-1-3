
function calcularH() {
    let limiteInferior = document.getElementById('a').value;
    let limiteSuperior = document.getElementById('b').value;
    let numeroIntervalos = document.getElementById('n').value;

    let h = (limiteSuperior - limiteInferior) / numeroIntervalos;
    return h;
}

function mostrarFuncionNormal() {
    let valoresfx = [];
    let valorDeH = parseFloat(calcularH());
    let limiteInferior = parseFloat(document.getElementById('a').value);
    let numeroIntervalos = parseInt(document.getElementById('n').value);
    let valorX = 0;

    for (let i = 0; i < numeroIntervalos + 1; i++) {
        let fx = document.getElementById('fx').value;
        fx = fx.split('');
        valorX = limiteInferior + (i * valorDeH);

        for (let j = 0; j < fx.length; j++) {
            switch (fx[j]) {
                case 'x':
                    fx[j] = valorX;
                    break;
            }
        }
        fx = fx.join('');

        valoresfx.push(fx);
    }
    return valoresfx;
}


function reescribirFuncion() {
    let fx = document.getElementById('fx').value;
    fx = fx.split('');

    for (let i = 0; i < fx.length; i++) {
        switch (fx[i]) {
            case '^'://reconocer exponente
                fx[i] = 'Math.pow';
                break;
            case 's':
                if (fx[i + 1] == 'e' && fx[i + 2] == 'n') {//reconocer seno
                    fx[i] = 'Math.sin';
                    fx[i + 1] = '';
                    fx[i + 2] = '';
                } else if (fx[i + 1] == 'q') {//reconocer raíz cuadrada
                    fx[i] = 'Math.sqrt';
                    fx[i + 1] = '';
                } else {
                    break;
                }
            case 'c'://reconocer coseno
                if (fx[i + 1] == 'o' && fx[i + 2] == 's') {
                    fx[i] = 'Math.cos';
                    fx[i + 1] = '';
                    fx[i + 2] = '';
                } else {
                    break;
                }
            case 'a':
                if (fx[i + 1] == 'b' && fx[i + 2] == 's') {//reconocer valor absoluto
                    fx[i] = 'Math.abs';
                    fx[i + 1] = '';
                    fx[i + 2] = '';
                } else if (fx[i + 1] == 'c' && fx[i + 2] == 'o' && fx[i + 3] == 's') {//reconocer arco coseno
                    fx[i] = 'Math.acos';
                    fx[i + 1] = '';
                    fx[i + 2] = '';
                    fx[i + 3] = '';
                } else {
                    break;
                }
            case 't'://reconocer tangente
                if (fx[i + 1] == 'a' && fx[i + 2] == 'n') {
                    fx[i] = 'Math.tan';
                    fx[i + 1] = '';
                    fx[i + 2] = '';
                } else {
                    break;
                }
            case 'l'://reconocer logaritmo
                if (fx[i + 1] == 'o' && fx[i + 2] == 'g') {
                    fx[i] = 'Math.log';
                    fx[i + 1] = '';
                    fx[i + 2] = '';
                } else {
                    break;
                }
        }
    }

    fx = fx.join('');

    return fx;
}



function calcularFx() {
    let valoresFx = [];
    let valorDeH = parseFloat(calcularH());
    let limiteInferior = parseFloat(document.getElementById('a').value);
    let numeroIntervalos = parseInt(document.getElementById('n').value);
    let valorX;
    let resultados;


    for (let i = 0; i <= numeroIntervalos; i++) {
        let fx = reescribirFuncion();
        fx = fx.split('');
        valorX = limiteInferior + (i * valorDeH);

        for (let j = 0; j < fx.length; j++) {
            switch (fx[j]) {
                case 'x':
                    fx[j] = valorX;
                    break;
            }
        }
        fx = fx.join('');
        resultados = eval(fx);

        valoresFx.push(resultados);
    }
    return valoresFx;
}

function imprimirResultadoFinal() {
    let valoresFx = calcularFx();
    let resultado;
    let h = calcularH();
    let sumatoriaPar = 0;
    let sumatorioImpar = 0;

    for (i = 1; i < valoresFx.length - 1; i++) {
        if (i % 2 != 0) {
            sumatoriaPar += 4 * valoresFx[i];
        } else {
            sumatorioImpar += 2 * valoresFx[i];
        }
    }

    resultado = (h / 3) * (parseFloat(valoresFx[0]) + sumatoriaPar + sumatorioImpar + parseFloat(valoresFx[valoresFx.length - 1]));
    let resultadoRedondeado = resultado.toFixed(4);

    let resultadoFinal = document.getElementById('resultadoFinal');
    resultadoFinal.innerHTML = '';
    let datoParrafo = document.createElement('p');
    datoParrafo.innerText = "La integral por el método de Simpson 1/3 compuesto es:\n" + resultadoRedondeado;
    resultadoFinal.appendChild(datoParrafo);
}

function imprimirFx() {
    let funcionNormal = mostrarFuncionNormal();
    let valoresFx = calcularFx();
    let resultado = document.getElementById('resultadoXi');
    resultado.innerHTML = '';

    for (let i = 0; i < valoresFx.length; i++) {
        let datoParrafo = document.createElement('p');
        datoParrafo.innerText = 'Y'+i+' = ' +valoresFx[i];

        resultado.appendChild(datoParrafo);
    }
}


function imprimirXi(){
    let resultado = document.getElementById('resultadoFx');
    resultado.innerHTML = '';
    let h = calcularH();
    let numeroIntervalos = parseInt(document.getElementById('n').value);
    let limiteInferior = parseFloat(document.getElementById('a').value);
    let X;

    for(let i=0; i <= numeroIntervalos; i++){
        X = limiteInferior + (i*h);

        let datoParrafo = document.createElement('p');
        datoParrafo.innerText = 'X'+i+' = ' + X;

        resultado.appendChild(datoParrafo);
    }
}

function calcular(){
    imprimirResultadoFinal();
    imprimirFx();
    imprimirXi();
}
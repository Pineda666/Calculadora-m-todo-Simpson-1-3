
function calcularH() {
    let limiteInferior = document.getElementById('a').value;
    let limiteSuperior = document.getElementById('b').value;
    let numeroIntervalos = document.getElementById('n').value;

    let h = (limiteSuperior - limiteInferior) / numeroIntervalos;
    return h;
}

/*
valores = [];

function ingresarValoresFuncion() {
    i = 0;
    do {
        var valor_de_funcion = prompt("Ingrese valor de y" + "(" + i + ")"
            + "\n" + "No ingrese ningún valor para salir");
        if (valor_de_funcion == "") {
            break;
        } else {
            valores.push(valor_de_funcion);
            i++;
        }
    } while (valor_de_funcion != "")

    var msg = "";

    for (i = 0; i < valores.length; i++) {
        msg += "Y(" + i + ")" + ": " + valores[i] + "\n";
    }
}
*/


function reescribirFuncion() {
    let fx = document.getElementById('fx').value;
    fx = fx.split('');

    for (let i = 0; i < fx.length; i++) {
        switch (fx[i]) {
            case '^':
                fx[i] = 'Math.pow(' + fx[i - 1] + ',' + fx[i + 1] + ')';
                fx[i - 1] = '';
                fx[i + 1] = '';
                break;
            case 's':
                if (fx[i + 1] == 'e' && fx[i + 2] == 'n') {
                    fx[i] = 'Math.sin';
                    fx[i + 1] = '';
                    fx[i + 2] = '';
                } else if (fx[i + 1] == 'q') {
                    fx[i] = 'Math.sqrt';
                    fx[i + 1] = '';
                } else {
                    break;
                }
            case 'c':
                if (fx[i + 1] == 'o' && fx[i + 2] == 's') {
                    fx[i] = 'Math.cos';
                    fx[i + 1] = '';
                    fx[i + 2] = '';
                } else {
                    break;
                }
            case 'a':
                if (fx[i + 1] == 'b' && fx[i + 2] == 's') {
                    fx[i] = 'Math.abs';
                    fx[i + 1] = '';
                    fx[i + 2] = '';
                } else if (fx[i + 1] == 'c' && fx[i + 2] == 'o' && fx[i + 3] == 's') {
                    fx[i] = 'Math.acos';
                    fx[i + 1] = '';
                    fx[i + 2] = '';
                    fx[i + 3] = '';
                } else {
                    break;
                }
            case 't':
                if (fx[i + 1] == 'a' && fx[i + 2] == 'n') {
                    fx[i] = 'Math.tan';
                    fx[i + 1] = '';
                    fx[i + 2] = '';
                } else {
                    break;
                }
            case 'l':
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
    valoresFx = [];
    var valorDeH = parseFloat(calcularH());
    var limiteInferior = parseFloat(document.getElementById('a').value);
    var numeroIntervalos = parseInt(document.getElementById('n').value);
    var valorX = 0;
    let resultados;


    for (let i = 0; i < numeroIntervalos + 1; i++) {
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

function calcular() {
    var valoresFx = calcularFx();
    var resultado;
    var h = calcularH();
    var sumatoriaPar = 0;
    var sumatorioImpar = 0;

    for (i = 1; i < valoresFx.length - 1; i++) {
        if (i % 2 != 0) {
            sumatoriaPar += 4 * valoresFx[i];
        } else {
            sumatorioImpar += 2 * valoresFx[i];
        }
    }

    resultado = (h / 3) * (parseFloat(valoresFx[0]) + sumatoriaPar + sumatorioImpar + parseFloat(valoresFx[valoresFx.length - 1]));
    resultadoRedondeado = resultado.toFixed(4);

    alert("La integral por el método de Simpson 1/3 compuesto es:\n" + resultadoRedondeado);

}
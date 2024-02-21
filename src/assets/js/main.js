function main() {
    let form = document.querySelector('.form');
    let botaoValidar = document.querySelector('.botaoValidar');
    let botaoLimpar = document.querySelector('.botaoLimpar');
    let resultado = document.querySelector('.resultado');

    botaoLimpar.addEventListener('click', function (event) {
        event.preventDefault();

        form.querySelector('.cpf').value = '';
        resultado.innerHTML = '';
        resultado.classList.remove('invalido', 'valido');
    });

    botaoValidar.addEventListener('click', function (event) {
        event.preventDefault();

        let cpf = form.querySelector('.cpf').value;
        let valorResultado = document.createElement('valorResultado');;

        resultado.innerHTML = '';
        resultado.classList.remove('invalido', 'valido');
        ehValido = validarCpf(cpf);

        if(ehValido){
            valorResultado.innerText = 'CPF válido!'
            resultado.classList.add('valido')
        } else {
            valorResultado.innerText = 'CPF inválido!'
            resultado.classList.add('invalido')
        }

        resultado.appendChild(valorResultado);
    });
}

function validarCpf(cpf) {
    cpf = limparCpf(cpf);
    let cpfArray = Array.from(cpf);
    
    if(verificarLimite(cpfArray)) {
        let cpfArrayNumerico = transformarEmNumero(cpfArray);
        return realizarCalculo(cpfArrayNumerico);
    }
    return false;
}

// função que limpa cpf. "/\D+/g" = tudo que não for número
const limparCpf = (cpfSujo) => cpfSujo.replace(/\D+/g, '');

const verificarLimite = (cpf) => cpf.length === 11;

function realizarCalculo(cpfArray) {

    let ultimosDigitosEnviados = cpfArray.splice(cpfArray.length-2, 2);

    let numerosMultiplicados = cpfArray.map((valor, indice) => valor * ((cpfArray.length + 1) - indice));
    let somaValores = numerosMultiplicados.reduce((acumulador, valor) => {
        acumulador += valor;
        return acumulador;
    }, 0);
    penultimoDigito = (somaValores % 11) < 2 ? 0 : 11 - (somaValores % 11);


    cpfArray.push(penultimoDigito);
    numerosMultiplicados = cpfArray.map((valor, indice) => valor * ((cpfArray.length + 1) - indice));
    somaValores = numerosMultiplicados.reduce((acumulador, valor) => {
        acumulador += valor;
        return acumulador;
    }, 0);
    ultimoDigito = (somaValores % 11) < 2 ? 0 : 11 - (somaValores % 11);

    return ultimosDigitosEnviados[0] == penultimoDigito && 
           ultimosDigitosEnviados[1] == ultimoDigito; 
  
}

function transformarEmNumero(cpfArray) {
    let cpfArrayNumerico = cpfArray.map((valor) => Number(valor));
    return cpfArrayNumerico;
} 


main();
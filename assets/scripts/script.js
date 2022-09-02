const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');;/*o js vai procurar um id que seja igual a tecla o * fala que qualquer elemento que tenha parte do atributo como tecla*/
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;/*verifica se o operador é diferente  de undefined */
const calcular = () => {
  if (operacaoPendente()) {
    const numeroAtual =  parseFloat(display.textContent.replace(',','.'));
    novoNumero = true;
    const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
    atualizarDisplay(resultado);

    /*
    if (operador == '+') {
      atualizrDisplay(numeroAnterior + numeroAtual)
    } else if (operador == '-') {
      atualizrDisplay(numeroAnterior - numeroAtual)
    }
    else if (operador == '/') {
      atualizrDisplay(numeroAnterior / numeroAtual)
    }
    else if (operador == '*') {
      atualizrDisplay(numeroAnterior * numeroAtual)
    }*/
  }
}

const atualizarDisplay = (texto) => {
  if (novoNumero) {
    display.textContent = texto.toLocaleString('BR'); /*limpa a tela é coloca o novo número */
    novoNumero = false;/*permite digitar outro número sem apagar o anterior */
  } else {
    display.textContent += texto.toLocaleString('BR');/*recebe o texto (o + antes do = concatena )*/
  }
 
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach (numero => numero.addEventListener('click',inserirNumero) /*pega o numero e adiciona um evento de click e adiciona em outro calback  */
  );

const selecionarOperador=(evento) => {
  if (!novoNumero){
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;/*grava qual operador foi utilizado */
    numeroAnterior = parseFloat(display.textContent.replace(',','.'));/*armazena o número anterior  */
  } 

}/*ele faz com que o display seja apadado assim que um operador for selecionado e armazena ele na variável operador*/

 operadores.forEach(operador => operador.addEventListener('click',selecionarOperador)); /*pega o operador)*/

const ativarIgual = () => {
  calcular();
  operador = undefined;/* com isso ele é impedido de fazer uma nova operação*/
}
document.getElementById('igual').addEventListener('click',ativarIgual);



const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
  limparDisplay();
  operador = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const romoverUltimoNumero = () =>display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', romoverUltimoNumero);

const inverterSinal = () => {
  novoNumero = true;
  atualizarDisplay(display.textContent * -1);

}
document.getElementById('inverter').addEventListener('click',inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') !== -1;

const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () =>{
  if (!existeDecimal()) {
    if (existeValor()){
      atualizarDisplay(',');
    }else {
      atualizarDisplay('0,')
    }
  }
}
document.getElementById('decimal').addEventListener('click',inserirDecimal);




const mapaTeclado = {
  0: 'tecla0',
  1: 'tecla1',
  2: 'tecla2',
  3: 'tecla3',
  4: 'tecla4',
  5: 'tecla5',
  6: 'tecla6',
  7: 'tecla7',
  8: 'tecla8',
  9: 'tecla9',
  '/': 'operadorDividir',
  '*': 'operadorMultiplicar',
  '-': 'operadorSubtrair',
  '+': 'operadorAdicionar',
  '=': 'igual',
  Enter: 'igual',
  Backspace: 'backspace',
  c: 'limparDisplay',
  Escape: 'limparCalculo',
  ',': 'decimal',
};

const mapearTeclado = (evento) => {
  const tecla = evento.key;
  const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
  if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
};
document.addEventListener('keydown', mapearTeclado);





/*
const inserirNumero = (evento) => display.textContent = evento.target.textContent; recebe o evento, depois aplica no display o valor( display.textContent = evento.target).
numeros.forEach(numero => numero.addEventListener('click',inserirNumero) /*pega o numero e adiciona um evento de click e adiciona em outro calback  
  ); forEach() ele verifica os elementos de um array */
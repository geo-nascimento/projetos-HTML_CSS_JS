//Seleções principais
const main = document.querySelector('main');
const root = document.querySelector(':root');
const input = document.getElementById('input');
const resultInput = document.getElementById('result');


//caracteres permitidos no input
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "];

//funcionamento das teclas do teclado
input.addEventListener('keydown', (ev) => {
    ev.preventDefault();//quero fazer uma verificação antes de inserir

    if (allowedKeys.includes(ev.key)) {
        input.value += ev.key;
        return;
    }

    if (ev.key === 'Backspace') {
        input.value = input.value.slice(0, -1);
    }

    if (ev.key === 'Enter') {
        calculate();
    }
});

//funcionamento dos botões da calculadora

document.querySelectorAll('.charKey').forEach((charkeyBtn) => {
    charkeyBtn.addEventListener('click', () => {
        const value = charkeyBtn.dataset.value;
        input.value += value;
    });
});

//funcionamento do C e do =
document.getElementById('clear').addEventListener('click', () => {
    input.value = '';
    input.focus();
});

document.getElementById('equal').addEventListener('click', calculate);

//calcular
function calculate() {
    resultInput.value = 'ERROR';
    resultInput.classList.add('error');

    const result = eval(input.value);

    resultInput.value = result;
    resultInput.classList.remove('error');
}

//trocar o tema

//copiar para area de transferência
document.getElementById('copyToClipboard').addEventListener('click', (ev) => {
    const button = ev.currentTarget;
    if (button.innerText == 'Copy') {
        button.innerText = 'Copied';
        button.classList.add('success');
        window.navigator.clipboard.writeText(resultInput.value);
    } else {
        button.innerText = 'Copy';
        button.classList.remove('success');
    }
});
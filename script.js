// Variável para a ordem das cores
let order = [];
// Variável para as cores clicadas
let clickedOrder = [];
// Variável para a pontuação
let score = 0;
//0 - green
//1 - red
//2 - yellow
//3 - blue

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const green = document.querySelector(".green");

const btnStart = document.querySelector(".start");
const btnRestart = document.querySelector(".restart");
const btnContinue = document.querySelector(".continue");
const txtScore = document.querySelector(".score");
const txtScoreFinal = document.querySelector(".score-final");

const modal = document.querySelector(".modal-info");
const congrats = document.querySelector(".congrats");
const modalGameOver = document.querySelector(".modal-game-over");
const txtTimer = document.querySelector(".timer");


//Criar ordem aleatória para as cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//Ilumina a próxima cor e apaga
let lightColor = (element, number) => {
    number = number * 500;
    
    setTimeout(() => {
        element.classList.add("selected");
    }, number - 250);

    setTimeout(() => {
        element.classList.remove("selected");
    }, number);
}

//Checa se os botões clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {

            blue.classList.add("lose");
            green.classList.add("lose");
            yellow.classList.add("lose");
            red.classList.add("lose");

            gameOver();
            break;
        }
    }

    if(clickedOrder.length == order.length) {
        congrats.classList.remove("hide");
    }
}

//Função para o clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add("selected");

    setTimeout(() => {
        createColorElement(color).classList.remove("selected");
        checkOrder();
    }, 250);
}

//Função que retorna a cor clicada
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if(color == 2) {
        return yellow;
    } else if(color == 3) {
        return blue;
    }
}

//Função para o próximo nível do jogo
let nextLevel = () => {
    score++;
    txtScore.innerHTML = score;
    shuffleOrder();
}

//Função para game over
let gameOver= () => {
    modalGameOver.classList.remove("hide");
    txtScoreFinal.innerHTML = score;
    order = [];
    clickedOrder = [];

    blue.classList.remove("lose");
    green.classList.remove("lose");
    yellow.classList.remove("lose");
    red.classList.remove("lose");
}

//Função para iniciar o jogo
let playGame = () => {
    score = 0;
    nextLevel();
}

btnStart.onclick = () => {
    modal.classList.add("hide");
    txtTimer.classList.add("counting");

    countDown(3);

    setTimeout(function(){
        playGame();
    }, 6000);
}

btnRestart.onclick = () => {
    modalGameOver.classList.add("hide");
    congrats.classList.add("hide");
    txtTimer.classList.remove("hide");
    txtTimer.classList.add("counting");
    txtTimer.innerHTML = "";
    clearInterval(countDown);
    countDown(3);

    setTimeout(function(){
        playGame();
    }, 6000);
}

let countDown = (time) => {
    let timeLeft = time;

    let countTime = setInterval(function() {

        if (timeLeft <= 0){
            clearInterval(countTime);
            txtTimer.innerHTML = "Já!";

            setTimeout(() => {
                txtTimer.classList.add("hide");
            }, 1000);

        } else {
            txtTimer.innerHTML = timeLeft;
            timeLeft--;
        }
    

    }, 1000);

}

btnContinue.onclick = () => {
    nextLevel();
    congrats.classList.add("hide");
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


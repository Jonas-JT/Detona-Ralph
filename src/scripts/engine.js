const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        buttons: {
            start: document.querySelector("#start"),
            reset: document.querySelector("#reset"),
        },
    },
    values: {
        gameVelocity: 1000,
        hitposition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerID: setInterval(countdown, 1000),
    },
};

let lastSquareIndex = null; // Variável para armazenar o último índice

function countdown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerID);
        clearInterval(state.actions.timerId);
        alert("Game over! O seu resultado foi: " + state.values.result);
    }
}

function playSound(audioName) {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 9); // Gera um número aleatório entre 0 e 8
    } while (randomNumber === lastSquareIndex); // Garante que o número seja diferente do último

    lastSquareIndex = randomNumber; // Atualiza o último índice
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitposition = randomSquare.id;
}

function addListernerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitposition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitposition = null;
                playSound("hit");
            }
        });
    });
}

function resetGame() {
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerID);
    state.values.currentTime = 60; // Reseta o tempo
    state.values.result = 0; // Reseta a pontuação
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;
    state.view.squares.forEach((square) => square.classList.remove("enemy")); // Remove inimigos
}

function startGame() {
    resetGame(); // Garante que o jogo começa limpo
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerID = setInterval(countdown, 1000);
}

function initialize() {
    addListernerHitBox();
    state.view.buttons.reset.addEventListener("click", resetGame);
    state.view.buttons.start.addEventListener("click", startGame);
}

initialize();

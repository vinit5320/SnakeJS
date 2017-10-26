(function () {
    'use strict';

    var snakeGame = window.snakeGame || (window.snakeGame = {});

    snakeGame.level = 4;

    snakeGame.initialize = initialize;
    snakeGame.start = start;
    snakeGame.gameOver = gameOver;
    snakeGame.changeGameLevel = changeGameLevel;

    function initialize() {
        snakeGame.snake = createSnakeObject();
    }

    function createSnakeObject() {
        var snake = new SnakeBoard;
        snake.init({
            snakeBoardContainer: "snake-board",
            scoreID: "score",
            columns: 26,
            rows: 26,
            level: snakeGame.level,
            didFinishGame: snakeGame.gameOver
        });
        return snake;
    }

    function start(btn) {
        btn.blur();
        btn.disabled = true;
        btn.innerText = "Playing...";
        document.getElementById('snake-board').innerHTML = "";
        snakeGame.snake = createSnakeObject();
        snakeGame.snake.start();
    }

    function gameOver() {
        var startButton = document.getElementById('start-button');
        startButton.disabled = false;
        startButton.innerText = "Start Game";
        alert("Game Over!!");
    }

    function changeGameLevel(level, btn) {
        alert("To be implemented in future versions !");
    }

})();

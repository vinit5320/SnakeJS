// PUBLIC static variables
var playerMoves = {},
    DIRECTION = {
        LEFT: 0,
        UP: 1,
        RIGHT: 2,
        DOWN: 3
    },
    GAMESTATE = {
        LIVE: 0,
        DEAD: 1
    },
    CELL = {
        EMPTY: 0,
        SNAKE: 1,
        FRUIT: 2
    },
    MOVE = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };

// PRIVATE Instance Variables
const _playerScore = new WeakMap();

class SnakeBoard {

    /**
     * Initialize the Game Object
     */
    init(config) {
        // initialize game environment variables
        this.config = config;
        this._boardID = config.snakeBoardContainer || "body";
        this._columns = config.columns || 28;
        this._rows = config.rows || 28;
        this.level = config.level || 4; // TODO: Implement Fron-end buttons for difficulty levels
        _playerScore.set(this, 0);

        // initialize game container
        this.setupCanvas();
        this.grid = new Grid(CELL.EMPTY, this._columns, this._rows);
        var startingPoint = {x: 5, y: 5};
        this.grid.set(CELL.SNAKE, startingPoint.x, startingPoint.y);
        this.snake = new Snake(DIRECTION.RIGHT, startingPoint.x, startingPoint.y);

        this.draw();
    }

    /**
     * Start the game
     */
    start() {
        this._frames = 0;
        this.state = GAMESTATE.LIVE;

        this.setFood();
        this.setupKeyboardListener();
        this.loop();
    }

    /**
     * The game loop function that updates the frame and draws on the canvas
     */
    loop() {
        this.update();
        this.draw();
        window.requestAnimationFrame(this.loop.bind(this), this._canvas);
    }

    /**
     * Updates the game logic
     */
    update() {
        this._frames++;
        // Changing direction of snake based on keys pressed
        this.setSnakeDirection();
        // update the position of snake every 10 - level times provided the snake is alive
        if (this._frames % (10 - this.level) === 0 && this.state === GAMESTATE.LIVE) {
            this.changeSnakePosition();
        }
    }

    /**
     * Activates the Keyboard Listeners
     */
    setupKeyboardListener() {
        // keeps track of the keybourd input
        document.addEventListener("keydown", function (evt) {
            playerMoves[evt.keyCode] = true;
        });
        document.addEventListener("keyup", function (evt) {
            delete playerMoves[evt.keyCode];
        });
    }

    /**
     * Renders the grid to the canvas
     */
    draw() {
        var cellWidth = this._canvas.width / this.grid.width;
        var cellHeight = this._canvas.height / this.grid.height;
        // iterate through the grid and draw all cells
        for (var x = 0; x < this.grid.width; x++) {
            for (var y = 0; y < this.grid.height; y++) {
                // set the fillstyle for each cell
                switch (this.grid.get(x, y)) {
                    case CELL.EMPTY:
                        this._context.fillStyle = "#343286";
                        break;
                    case CELL.SNAKE:
                        this._context.fillStyle = "#0ff";
                        break;
                    case CELL.FRUIT:
                        this._context.fillStyle = "#f00";
                        break;
                }
                this._context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);

                this._context.strokeStyle = "#2e2c7b";
                this._context.lineWidth = 1;
                this._context.strokeRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
            }
        }

        this.updateScore();
    }

    /**
     * Create Canvas in the HTML DOM
     */
    setupCanvas() {
        var board = (this._boardID === "body") ? document.body : document.getElementById(this._boardID);
        this._canvas = document.createElement("canvas");
        this._canvas.width = this._columns * 20;
        this._canvas.height = this._rows * 20;
        this._context = this._canvas.getContext("2d");
        // add the canvas element to the body of the document
        if (board) {
            board.appendChild(this._canvas);
        }
    }

    /**
     * Updates the Score on the front end node
     */
    updateScore() {
        var scoreBoard = document.getElementById(this.config.scoreID);
        if (scoreBoard) {
            scoreBoard.innerText = _playerScore.get(this);
        }
    }

    /**
     * Snake Business Logic
     */
    setSnakeDirection() {
        // Check for key pressed and resist opposite direction travel
        if (playerMoves[MOVE.LEFT] && this.snake._direction !== DIRECTION.RIGHT) {
            this.snake._direction = DIRECTION.LEFT;
        }
        if (playerMoves[MOVE.UP] && this.snake._direction !== DIRECTION.DOWN) {
            this.snake._direction = DIRECTION.UP;
        }
        if (playerMoves[MOVE.RIGHT] && this.snake._direction !== DIRECTION.LEFT) {
            this.snake._direction = DIRECTION.RIGHT;
        }
        if (playerMoves[MOVE.DOWN] && this.snake._direction !== DIRECTION.UP) {
            this.snake._direction = DIRECTION.DOWN;
        }
    }

    changeSnakePosition() {
        // get the head position of the snake
        var newXPosition = this.snake.last.x;
        var newYPosition = this.snake.last.y;
        // updates the position depending on the snake direction
        switch (this.snake._direction) {
            case DIRECTION.LEFT:
                newXPosition--;
                break;
            case DIRECTION.UP:
                newYPosition--;
                break;
            case DIRECTION.RIGHT:
                newXPosition++;
                break;
            case DIRECTION.DOWN:
                newYPosition++;
                break;
        }

        // Check the game status and return didFinish if snake is DEAD
        this.checkGameStatus(newXPosition, newYPosition);
        if (this.state === GAMESTATE.DEAD) {
            if(this.config.didFinishGame) {
                return this.config.didFinishGame();
            } else {
                alert("Game Over!");
            }
        }
        // Update snake's position
        this.updateSnakePosition(newXPosition, newYPosition);
    }

    checkGameStatus(newXPosition, newYPosition) {
        // checks all game ending conditions
        if (0 > newXPosition || newXPosition > this.grid.width - 1 ||
            0 > newYPosition || newYPosition > this.grid.height - 1 ||
            this.grid.get(newXPosition, newYPosition) === CELL.SNAKE
        ) {
            this.state = GAMESTATE.DEAD;
        } else {
            this.state = GAMESTATE.LIVE;
        }
    }

    updateSnakePosition(newXPosition, newYPosition) {
        // check if the snake is on FRUIT's position
        if (this.grid.get(newXPosition, newYPosition) === CELL.FRUIT) {
            // increment the score and sets a new fruit position
            _playerScore.set(this, _playerScore.get(this) + 1);
            this.setFood();
        } else {
            // Remove the tail and make it empty
            var tail = this.snake.deleteTail();
            this.grid.set(CELL.EMPTY, tail.x, tail.y);
        }
        // Add new snake head based on direction
        this.grid.set(CELL.SNAKE, newXPosition, newYPosition);
        this.snake.insertHead(newXPosition, newYPosition);
    }

    /**
     * Set a food item at a random place in the grid
     */
    setFood() {
        var emptyCells = [];
        // iterate through the grid and find all empty cells
        for (var x = 0; x < this.grid.width; x++) {
            for (var y = 0; y < this.grid.height; y++) {
                if (this.grid.get(x, y) === CELL.EMPTY) {
                    emptyCells.push({x: x, y: y});
                }
            }
        }
        // chooses a random cell and if it's a corner then calls setFood again
        var randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (!this.isCorner(randomCell)) {
            this.grid.set(CELL.FRUIT, randomCell.x, randomCell.y);
        } else {
            this.setFood();
        }
    }

    isCorner(position) {
        return ( position.x === 0 && position.y === 0 ||
            position.x === this._columns - 1 && position.y === this._rows - 1 ||
            position.x === this._columns - 1 && position.y === 0 ||
            position.x === 0 && position.y === this._rows - 1
        );
    }

}

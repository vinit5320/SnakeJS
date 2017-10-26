This is a DOM based classic snake game.

# Run this Game:
1. Double Click the [index.html](https://github.com/vinit5320/SnakeJS/blob/master/index.html) file and you are good to play the game!


# Steps to implement in your project:
1. Copy the [Snake folder](https://github.com/vinit5320/SnakeJS/tree/master/Snake) to you local project.
2. Import all the JS and CSS files.
3. Create a div tag with an ID.
4. Write the following code in your script to initialize the game:
```
    var snake = new SnakeBoard;
    snake.init({
        snakeBoardContainer: "snake-board", // DOM Element ID of your Div tag to inject the game canvas
        scoreID: "score",                   // DOM Element ID of your label to display the score
        columns: 26,                        // Number of columns in the game board
        rows: 26,                           // Number of rows in the game board
        level: snakeGame.level,             // speed of the snake (TODO)
        didFinishGame: snakeGame.gameOver   // Callback function that is triggered on game over
    });
 ```
5. Attach `snake.start();` to any button or call directly inside your script to start the game.

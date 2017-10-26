This is a DOM based classic snake game.

# Run this Game:
1. Double Click the index.html file and you are good to play the game!


# Steps to implement in your project:
1. Copy the Snake folder to you local project.
2. Import all the JS and CSS files.
3. Create a div tag with an ID.
4. Write the following code in your script to initialize the game:
    var snake = new SnakeBoard;
    snake.init({
        snakeBoardContainer: "snake-board", // DOM Element ID of your Div tag to inject the game canvas
        scoreID: "score",                   // DOM Element ID of your label to display the score
        columns: 26,                        // Number of columns in the game board
        rows: 26,                           // Number of rows in the game board
        level: snakeGame.level,             // speed of the snake (TODO)
        didFinishGame: snakeGame.gameOver   // Callback function that is triggered on game over
    });
5. Attach "snake.start();" to any button or call directly inside your script to start the game.


# Future Implementations:
1. Implement the difficulty level buttons to increase the speed of the snake.
2. Add images using "context.drawImage" in the canvas for the snake body and fruits.
3. Add multiple fruit images that generate a random fruit as food for snake everytime.
4. Add special bonus limited time SUPER Fruits that increase your score by 10 directly.
5. Add Pop animation when snake eats a fruit.
6. Create a menu overlay on top of canvas that provides various game options.
7. Store the player score on local storage and display high scores on the menu.
8. Make the Snake module more customizable to provide CSS styling options to main project.

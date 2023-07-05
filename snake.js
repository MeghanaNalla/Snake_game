var blockSize = 25;
var rows = 30;
var cols = 30;
var board;
var context; 

var snakeX=blockSize*5;
var snakeY=blockSize*5;

var velocityX=0;
var velocityY=0;

var snakeBody=[];
// var foodX= blockSize*10;
// var foodY= blockSize*10;

var foodX;
var foodY;

var gameOver=false;

var score=0;
var scoreboardElement ;
var restartButton;


window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); 

    placeFood();
    document.addEventListener("keyup",changeDirection);
    scoreboardElement = document.getElementById("scoreboard");
    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", resetGame);
    setInterval(update,1000/10);
    
}

function update()
{

    if(gameOver)
    {
        return;
    }
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="yellow";
    context.fillRect(foodX,foodY, blockSize, blockSize);

    if(snakeX==foodX&&snakeY==foodY)
    {  updateScore();
        snakeBody.push([foodX, foodY]);
        placeFood();

    }


    for(let i=snakeBody.length-1;i>0;i--)
    {
        snakeBody[i]=snakeBody[i-1];
    }
    if(snakeBody.length)
    {
        snakeBody[0]=[snakeX,snakeY];
    }

    context.fillStyle="purple";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for( let i=0;i<snakeBody.length;i++)
    {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }


    if(snakeX < 0 || snakeY < 0 || snakeX > cols * blockSize || snakeY > rows * blockSize ) 
    { 
        gameOver=true;
    alert("Game over");
    }

    for(let i=0;i<snakeBody.length;i++)
    {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1])
        {
        gameOver=true;
        alert("Game over");
    }
}
}

function resetGame() {
    gameOver = false;
    score = 0;
    scoreboardElement.textContent = "Score: " + score;
  
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
  
    snakeBody = [];
  
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
  
    placeFood();
  }

function updateScore() {
    score += 10;
    scoreboardElement.textContent = "Score: " + score;
  }

function changeDirection(e)
{
    if(e.code=="ArrowUp"&&velocityY!=1)
    {
        velocityX=0;
        velocityY=-1;
    }
    else if(e.code=="ArrowDown" && velocityY!=-1)
    {
        velocityX=0;
        velocityY=1;
    }
    else if(e.code=="ArrowRight"&& velocityX!=-1)
    {
        velocityX=1;
        velocityY=0;
    }
    else if(e.code=="ArrowLeft" && velocityX!=1)
    {
        velocityX=-1;
        velocityY=0;
    }
}

function placeFood()
{
    foodX=Math.floor(Math.random()*cols)*blockSize;
    foodY=Math.floor(Math.random()*rows)*blockSize; 
}
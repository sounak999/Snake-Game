// Game Constants 
let inputDir = {x: 0, y: 0}
const foodSound = new Audio('../music/food.mp3')
const gameOverSound = new Audio('../music/gameover.mp3')
const moveSound = new Audio('../music/move.mp3')
const musicSound = new Audio('../music/music.mp3')

let speed = 8
let lastPaintTime = 0
let score = 0

let snakeArr = [
    {x: 13, y: 15}
]

food = {x: 10, y: 2};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime)/1000 < 1/speed) {
        return ;
    }

    lastPaintTime = ctime
    gameEngine();
}

function isCollide(snake) {

    for (let i = 1; i < snake.length; i++) {

        // if the snake collides into itself
        if ((snake[0].x === snake[i].x) && (snake[0].y === snake[i].y)) {
            return true;
        }
    }

    // if the snake bump into the wall
    if ((snake[0].x >= 18) || (snake[0].x <= 0) || (snake[0].y <= 0) || (snake[0].y >= 18)) {
        return true;
    }

    return false;
}


function gameEngine() {
    // updating the snake array & food

    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();

        inputDir = {x: 0, y: 0};
        alert('Game Over. Please press any key to start again!');

        snakeArr = [{x:13, y:15}];
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    // if the food is eaten, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});

        const a = 2, b = 16;
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())};
        console.log(food);

        score += 1;
        scoreBox.innerHTML = "Score: " + score;

        if(score > hiscoreVal){
            hiscoreVal = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreVal;
        }
    }

    // Moving the snake
    for(let i=snakeArr.length-2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement)
    })

    // displaying the food
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



// main workflow starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreVal = 0
    hiscoreBox.innerHTML = "HiScore: " + JSON.stringify(hiscoreVal);
}
else{
    hiscoreVal = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscoreVal;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    // start the game
    inputDir = {x: 0, y: 1};
    moveSound.play();

    console.log(e.key);
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0
            inputDir.y = -1
            break;
        case "ArrowDown":
            inputDir.x = 0
            inputDir.y = 1
            break;
        case "ArrowLeft":
            inputDir.x = -1
            inputDir.y = 0
            break;
        case "ArrowRight":
            inputDir.x = 1
            inputDir.y = 0
            break;
    
        default:
            break;
    }
})
// Get the canvas element
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 600;

// Game variables
let birdX = 50;
let birdY = 300;
let birdVelocity = 0;
let gravity = 0.2;
let pipeGap = 150;
let pipeWidth = 80;
let pipeHeight = 600;
let pipeX = canvas.width;
let score = 0;

// Load bird and pipe images
const birdImage = new Image();
birdImage.src = 'bird.png';

const pipeImage = new Image();
pipeImage.src = 'pipe.png';

// Game loop
function update() {
    // Update bird position
    birdY += birdVelocity;
    birdVelocity += gravity;

    // Check for collision with pipes
    if (checkCollision()) {
        alert('Game Over! Score: ' + score);
        return;
    }

    // Update pipe position
    pipeX -= 2;

    // Check if pipe is off screen
    if (pipeX < -pipeWidth) {
        pipeX = canvas.width;
        score++;
    }

    // Draw everything
    draw();
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    ctx.drawImage(birdImage, birdX, birdY, 30, 30);

    // Draw pipe
    ctx.drawImage(pipeImage, pipeX, 0, pipeWidth, pipeHeight);
    ctx.drawImage(pipeImage, pipeX, pipeHeight + pipeGap, pipeWidth, pipeHeight);

    // Draw score
    ctx.font = '24px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Score: ' + score, 10, 10);
}

function checkCollision() {
    // Check if bird is within pipe gap
    if (birdY + 30 > pipeHeight && birdY < pipeHeight + pipeGap) {
        if (birdX + 30 > pipeX && birdX < pipeX + pipeWidth) {
            return true;
        }
    }

    // Check if bird is outside screen bounds
    if (birdY < 0 || birdY > canvas.height - 30) {
        return true;
    }

    return false;
}

// Handle user input
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        birdVelocity = -5;
    }
});

// Start the game loop
setInterval(update, 16);
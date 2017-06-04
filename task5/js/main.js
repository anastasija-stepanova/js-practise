let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 1400;
canvas.height = 800;

function drawSky() {
  ctx.fillStyle = '#0071fd';
  ctx.fillRect(0, 0, 1400, 500);
}

function drawGrass() {
  ctx.fillStyle = '#2cb300';
  ctx.fillRect(0, 500, 1400, 400);

  let grassHeight = 30;
  let grassWidth = 15;
  for (let j = 540; j < canvas.height; j += 50) {
    for (let i = 10; i < canvas.width; i += 60) {
      drawLine(i, j, i, (j - grassHeight), '#203A27', 2);
      drawLine(i, j, (i - grassWidth), (j - grassHeight), '#203A27', 2);
      drawLine(i, j, (i + grassWidth), (j - grassHeight), '#203A27', 2);
    }
  }
}

function drawHouse() {
  ctx.fillStyle = '#8c4c00';
  ctx.fillRect(150, 350, 400, 350);

  let brickWidth = 35;
  let brickHeight = 20;
  for (let j = 355; j < 705; j += 25) {
    for (let i = 158; i < 520; i += brickWidth) {
      ctx.strokeStyle = '#731111';
      ctx.strokeRect(i, j, brickWidth, brickHeight);
    }
  }

  ctx.fillStyle = '#8c4c00';
  ctx.fillRect(430, 150, 50, 150);

  ctx.beginPath();
  ctx.moveTo(350, 150);
  ctx.lineTo(150, 350);
  ctx.lineTo(550, 350);
  ctx.closePath();
  ctx.fillStyle = '#523008';
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(250, 400, 200, 200);

  drawLine(350, 400, 350, 600, '#523008', 7);
  drawLine(250, 465, 450, 465, '#523008', 7);

}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSky();
  drawGrass();
  drawSmoke();
  drawHouse();
  insertImageRabbit();
}

let cloudsCount = 3;
let setCloudX = [];
let setCloudY = [];
let setSpeed = [];

initializationArray();
function moveClouds() {
  for (let i = 0; i < cloudsCount; i++) {
    drawCloudsByBezier(setCloudX[i], setCloudY[i]);
    setCloudX[i] += setSpeed[i];
    if (setCloudX[i] > canvas.width) {
      setCloudX[i] = -300;
      setCloudY[i] = Math.random() * 70 + 70;
      setSpeed[i] = Math.random() + 0.1;
    }
  }
}

function drawSmoke(initialCoorY) {
  ctx.beginPath();
  ctx.arc(455, initialCoorY, 20, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#a2a0a0';
  ctx.fill();
}

let startSmokePosition = 140;
let smokePosition = startSmokePosition;
let startSpeed = 1;
let smokeSpeed = startSpeed;

function moveSmoke() {
  if (smokePosition < startSmokePosition / 2) {
    smokeSpeed = startSpeed * 3;
  } else if (smokePosition < startSmokePosition / 3) {
    smokeSpeed = startSpeed * 4;
  } else {
    smokeSpeed = startSpeed;
  }

  if (smokePosition > 0) {
    smokePosition -= smokeSpeed;
  }
  else {
    smokePosition = startSmokePosition;
  }
  drawSmoke(smokePosition);
}

function insertImageRabbit(initialCoorX, initialCoorY) {
  let rabbit = new Image();
  rabbit.src = 'images/rabbit.png';
  ctx.drawImage(rabbit, initialCoorX, initialCoorY, 115, 250);
}

let startRabbitPositionY = 400;
let rabbitPositionY = startRabbitPositionY;
let jumpDelta = 0;
let maxJumpDelta = 50;
let jumpStep = 5;
let canJump = true;

setInterval(function() {
  canJump = !canJump;
}, 5000);

function jumpRabbit() {
  insertImageRabbit(800, rabbitPositionY);
  jumpDelta = Math.abs(startRabbitPositionY - rabbitPositionY);
  if (canJump) {
    if (jumpDelta > maxJumpDelta) {
      jumpStep *= -1;
      rabbitPositionY += jumpStep;
      if (rabbitPositionY > startRabbitPositionY) {
        canJump = false;
      }
    } else {
      rabbitPositionY += jumpStep;
    }
  }
}

function drawLine(initialCoorX, initialCoorY, finiteCoorX, finiteCoorY, color, lineWidth) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.moveTo(initialCoorX, initialCoorY);
  ctx.lineTo(finiteCoorX, finiteCoorY);
  ctx.stroke();
}

function drawCloudsByBezier(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y, (x - 45), (y - 70), (x + 70), (y - 25));
  ctx.bezierCurveTo((x + 70), (y - 25), (x + 100), (y - 100), (x + 160), (y - 30));
  ctx.bezierCurveTo((x + 170), (y - 60), (x + 300), (y - 90), (x + 250), (y - 20));
  ctx.bezierCurveTo((x + 300), (y + 60), x, (y + 90), x, y);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fill();
}

function initializationArray() {
  for (let i = 0; i < cloudsCount; i++) {
    setCloudX.push(Math.random() * canvas.width);
    setCloudY.push(Math.random() * 70 + 70);
    setSpeed.push(Math.random() + 1);
  }
}

function animation() {
  clearCanvas();
  moveClouds();
  moveSmoke();
  jumpRabbit();
  requestAnimationFrame(animation);
}

requestAnimationFrame(animation);
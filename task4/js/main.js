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

function drawClouds() {
  drawCloudByBezier(100, 100);
  drawCloudByBezier(500, 110);
  drawCloudByBezier(950, 120);
}

function drawLine(initialCoorX, initialCoorY, finiteCoorX, finiteCoorY, color, lineWidth) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.moveTo(initialCoorX, initialCoorY);
  ctx.lineTo(finiteCoorX, finiteCoorY);
  ctx.stroke();
}

function drawCloudByBezier(x, y) {
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

drawSky();
drawGrass();
drawHouse();
drawClouds();
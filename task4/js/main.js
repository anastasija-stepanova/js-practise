(function() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = 1400;
  canvas.height = 800;
  let canvasWidth = canvas.width;
  let canvasHeight = canvas.height;

  let line = {
    initialCoorX: null,
    initialCoorY: null,
    finiteCoorX: null,
    finiteCoorY: null,
    color: null,
    lineWidth: null
  };

  drawSky(ctx);
  drawGrass(ctx, canvasWidth, canvasHeight, line);
  drawHouse(ctx, line);
  drawClouds(ctx);
}());

function drawSky(ctx) {
  ctx.fillStyle = '#0071fd';
  ctx.fillRect(0, 0, 1400, 500);
}

function drawGrass(ctx, canvasWidth, canvasHeight, line) {
  ctx.fillStyle = '#2cb300';
  ctx.fillRect(0, 500, 1400, 400);

  let grassHeight = 30;
  let grassWidth = 15;
  for (let j = 540; j < canvasHeight; j += 50) {
    for (let i = 10; i < canvasWidth; i += 60) {
      line.initialCoorX = i;
      line.initialCoorY = j;
      line.finiteCoorX = i;
      line.finiteCoorY = j - grassHeight;
      line.color = '#203A27';
      line.lineWidth = 2;
      drawLine(ctx, line);

      line.initialCoorX = i;
      line.initialCoorY = j;
      line.finiteCoorX = i - grassWidth;
      line.finiteCoorY = j - grassHeight;
      line.color = '#203A27';
      line.lineWidth = 2;
      drawLine(ctx, line);

      line.initialCoorX = i;
      line.initialCoorY = j;
      line.finiteCoorX = i + grassWidth;
      line.finiteCoorY = j - grassHeight;
      line.color = '#203A27';
      line.lineWidth = 2;
      drawLine(ctx, line);
    }
  }
}

function drawHouse(ctx, line) {
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

  line.initialCoorX = 350;
  line.initialCoorY = 400;
  line.finiteCoorX = 350;
  line.finiteCoorY = 600;
  line.color = '#523008';
  line.lineWidth = 7;
  drawLine(ctx, line);

  line.initialCoorX = 250;
  line.initialCoorY = 465;
  line.finiteCoorX = 450;
  line.finiteCoorY = 465;
  line.color = '#523008';
  line.lineWidth = 7;
  drawLine(ctx, line);

}

function drawClouds(ctx) {
  drawCloudByBezier(ctx, 100, 100);
  drawCloudByBezier(ctx, 500, 110);
  drawCloudByBezier(ctx, 950, 120);
}

function drawLine(ctx, line) {
  ctx.beginPath();
  ctx.lineWidth = line.lineWidth;
  ctx.strokeStyle = line.color;
  ctx.moveTo(line.initialCoorX, line.initialCoorY);
  ctx.lineTo(line.finiteCoorX, line.finiteCoorY);
  ctx.stroke();
}

function drawCloudByBezier(ctx, x, y) {
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
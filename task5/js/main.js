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

  let cloudModel = {
    cloudCount: 5,
    cloudCoordsX: [],
    cloudCoordsY: [],
    cloudSpeeds: []
  };

  let smokeModel = {
    startPosition: 140,
    smokePosition: 140,
    startSpeed: 0.5,
    smokeSpeed: 1
  };

  let rabbitModel = {
    canJump: true,
    startPositionY: 400,
    positionY: 400,
    jumpDelta: 0,
    maxJumpDelta: 50,
    jumpStep: 3
  };

  setInterval(function() {
    rabbitModel.canJump = !rabbitModel.canJump;
  }, 5000);

  function animation() {
    clearCanvas(ctx, canvasWidth, canvasHeight);
    drawSky(ctx);
    drawGrass(ctx, canvasWidth, canvasHeight, line);
    drawSmoke(ctx);
    drawHouse(ctx, line);
    insertImageRabbit(ctx);
    calcCoordsSmokeFrame(smokeModel);
    renderingSmokeFrame(ctx, smokeModel);
    calcCoordsCloudFrame(cloudModel, canvasWidth);
    renderingCloudFrame(ctx, cloudModel);
    calcCoordsRabbitFrame(rabbitModel);
    renderingRabbitFrame(ctx, rabbitModel);
    requestAnimationFrame(animation);
  }

  initializationArray(cloudModel, canvasWidth);
  requestAnimationFrame(animation);
})();

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

function clearCanvas(ctx, canvasWidth, canvasHeight) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function initializationArray(cloudModel, canvasWidth) {
  for (let i = 0; i < cloudModel.cloudCount; i++) {
    cloudModel.cloudCoordsX.push(Math.random() * canvasWidth);
    cloudModel.cloudCoordsY.push(Math.random() * 70 + 70);
    cloudModel.cloudSpeeds.push(Math.random() + 0.1);
  }
}

function calcCoordsCloudFrame(cloudModel, canvasWidth) {
  for (let i = 0; i < cloudModel.cloudCount; i++) {
    cloudModel.cloudCoordsX[i] += cloudModel.cloudSpeeds[i];
    if (cloudModel.cloudCoordsX[i] > canvasWidth) {
      cloudModel.cloudCoordsX[i] = -300;
      cloudModel.cloudCoordsY[i] = Math.random() * 70 + 70;
      cloudModel.cloudSpeeds[i] = Math.random() + 0.1;
    }
  }
  return [cloudModel.cloudCoordsX, cloudModel.cloudCoordsY];
}

function renderingCloudFrame(ctx, cloudModel) {
  let positions = calcCoordsCloudFrame(cloudModel);

  positions[0].forEach(function(item, i) {
    drawCloudsByBezier(ctx, positions[0][i], positions[1][i]);
  });
}

function drawSmoke(ctx, initialCoorY) {
  ctx.beginPath();
  ctx.arc(455, initialCoorY, 20, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#a2a0a0';
  ctx.fill();
}

function calcCoordsSmokeFrame(smokeModel) {
  if (smokeModel.smokePosition < smokeModel.startPosition / 2) {
    smokeModel.smokeSpeed = smokeModel.startSpeed * 3;
  } else if (smokeModel.smokePosition < smokeModel.startPosition / 3) {
    smokeModel.smokeSpeed = smokeModel.startSpeed * 4;
  } else {
    smokeModel.smokeSpeed = smokeModel.startSpeed;
  }

  if (smokeModel.smokePosition > 0) {
    smokeModel.smokePosition -= smokeModel.smokeSpeed;
  }
  else {
    smokeModel.smokePosition = smokeModel.startPosition;
  }

  return smokeModel.smokePosition;
}

function renderingSmokeFrame(ctx, smokeModel) {
  drawSmoke(ctx, calcCoordsSmokeFrame(smokeModel));
}

function insertImageRabbit(ctx, initialCoorX, initialCoorY) {
  let rabbit = new Image();
  rabbit.src = 'images/rabbit.png';
  ctx.drawImage(rabbit, initialCoorX, initialCoorY, 115, 250);
}

function calcCoordsRabbitFrame(rabbitModel) {
  rabbitModel.jumpDelta = Math.abs(rabbitModel.startPositionY - rabbitModel.positionY);
  if (rabbitModel.canJump) {
    if (rabbitModel.jumpDelta > rabbitModel.maxJumpDelta) {
      rabbitModel.jumpStep *= -1;
      rabbitModel.positionY += rabbitModel.jumpStep;
      if (rabbitModel.positionY > rabbitModel.startPositionY) {
        rabbitModel.canJump = false;
      }
    } else {
      rabbitModel.positionY += rabbitModel.jumpStep;
    }
  }

  return rabbitModel.positionY;
}

function renderingRabbitFrame(ctx, rabbitModel) {
  insertImageRabbit(ctx, 800, calcCoordsRabbitFrame(rabbitModel));
}

function drawLine(ctx, line) {
  ctx.beginPath();
  ctx.lineWidth = line.lineWidth;
  ctx.strokeStyle = line.color;
  ctx.moveTo(line.initialCoorX, line.initialCoorY);
  ctx.lineTo(line.finiteCoorX, line.finiteCoorY);
  ctx.stroke();
}

function drawCloudsByBezier(ctx, x, y) {
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
document.addEventListener('DOMContentLoaded', () => {
  const gameArea = document.getElementById('game-area');
  const scoreDisplay = document.getElementById('score');
  const gridSize = 20;
  const gameWidth = 400;
  const gameHeight = 400;

  let score = 0;
  let direction = { x: 1, y: 0 };
  let gameInterval;

  let snake = [
    { x: 5, y: 10 },
    { x: 4, y: 10 },
    { x: 3, y: 10 }
  ];

  let food = { x: 10, y: 10 };

  function draw() {
    gameArea.innerHTML = '';

    // draw snake
    snake.forEach(segment => {
      const div = document.createElement('div');
      div.classList.add('snake');
      div.style.left = `${segment.x * gridSize}px`;
      div.style.top = `${segment.y * gridSize}px`;
      gameArea.appendChild(div);
    });

    // draw food
    const foodEl = document.createElement('div');
    foodEl.classList.add('food');
    foodEl.style.left = `${food.x * gridSize}px`;
    foodEl.style.top = `${food.y * gridSize}px`;
    gameArea.appendChild(foodEl);
  }

  function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    //wall collision
    if (head.x < 0 || head.y < 0 || head.x >= gameWidth / gridSize || head.y >= gameHeight / gridSize) {
      return gameOver();
    }

    // self-collision
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return gameOver();
      }
    }

    snake.unshift(head);

    // food collision
    if (head.x === food.x && head.y === food.y) {
      score += 1;
      scoreDisplay.textContent = score;
      placeFood();
    } else {
      snake.pop();
    }

    draw();
  }

  function placeFood() {
    do {
      food.x = Math.floor(Math.random() * (gameWidth / gridSize));
      food.y = Math.floor(Math.random() * (gameHeight / gridSize));
    } while (snake.some(seg => seg.x === food.x && seg.y === food.y));
  }

  function gameOver() {
    clearInterval(gameInterval);
    alert(`Game Over! Your Score: ${score}`);
    resetGame();
  }

  function resetGame() {
    score = 0;
    scoreDisplay.textContent = score;
    direction = { x: 1, y: 0 };
    snake = [
      { x: 5, y: 10 },
      { x: 4, y: 10 },
      { x: 3, y: 10 }
    ];
    placeFood();
    draw();
    gameInterval = setInterval(moveSnake, 150);
  }

  document.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowUp':    if (direction.y === 0) direction = { x: 0, y: -1 }; break;
      case 'ArrowDown':  if (direction.y === 0) direction = { x: 0, y: 1 }; break;
      case 'ArrowLeft':  if (direction.x === 0) direction = { x: -1, y: 0 }; break;
      case 'ArrowRight': if (direction.x === 0) direction = { x: 1, y: 0 }; break;
    }
  });

  // touch buttons
  document.getElementById('up')?.addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: -1 };
  });
  document.getElementById('down')?.addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: 1 };
  });
  document.getElementById('left')?.addEventListener('click', () => {
    if (direction.x === 0) direction = { x: -1, y: 0 };
  });
  document.getElementById('right')?.addEventListener('click', () => {
    if (direction.x === 0) direction = { x: 1, y: 0 };
  });

  // start game
  draw();
  gameInterval = setInterval(moveSnake, 150);
});

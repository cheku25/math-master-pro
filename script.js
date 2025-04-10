let score = 0;
let questionCount = 1;
let timer;
let timeLeft = 10;

const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answerInput');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const qCountEl = document.getElementById('qCount');
const timeEl = document.getElementById('time');
const gameOverBox = document.getElementById('gameOver');
const finalScore = document.getElementById('finalScore');

const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const gameOverSound = document.getElementById('gameOverSound');

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTimeLimit(score) {
  if (score < 5) return 10;
  if (score < 10) return 7;
  return 5;
}

function startTimer() {
  clearInterval(timer);
  timeLeft = getTimeLimit(score);
  timeEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft === 0) {
      playSound(gameOverSound);
      endGame();
    }
  }, 1000);
}

function generateQuestion() {
  const types = ['+', '-', '*', '/', 'BODMAS'];
  const type = types[Math.floor(Math.random() * types.length)];
  let question, answer;

  if (type === '+') {
    let a = rand(10, 99), b = rand(1, 50);
    question = `${a} + ${b}`;
    answer = a + b;
  } else if (type === '-') {
    let a = rand(30, 100), b = rand(1, 29);
    question = `${a} - ${b}`;
    answer = a - b;
  } else if (type === '*') {
    let a = rand(2, 10), b = rand(2, 10);
    question = `${a} × ${b}`;
    answer = a * b;
  } else if (type === '/') {
    let b = rand(2, 10), a = b * rand(2, 10);
    question = `${a} ÷ ${b}`;
    answer = a / b;
  } else if (type === 'BODMAS') {
    let x = rand(1, 10), y = rand(1, 10), z = rand(1, 5);
    question = `(${x} + ${y}) × ${z}`;
    answer = (x + y) * z;
  }

  questionEl.textContent = question;
  questionEl.dataset.answer = answer;
  startTimer();
}

function checkAnswer() {
  const userAnswer = parseFloat(answerInput.value);
  const correctAnswer = parseFloat(questionEl.dataset.answer);
  clearInterval(timer);

  if (!isNaN(userAnswer) && Math.abs(userAnswer - correctAnswer) < 0.01) {
    score++;
    playSound(correctSound);
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "green";
    nextQuestion();
  } else {
    playSound(wrongSound);
    feedbackEl.textContent = `❌ Wrong! Correct: ${correctAnswer}`;
    feedbackEl.style.color = "red";
    playSound(gameOverSound);
    endGame();
  }
}

function nextQuestion() {
  scoreEl.textContent = score;
  questionCount++;
  qCountEl.textContent = questionCount;
  answerInput.value = '';
  generateQuestion();
}

function endGame() {
  answerInput.disabled = true;
  document.querySelector('button').disabled = true;
  gameOverBox.style.display = "block";
  finalScore.textContent = score;
  clearInterval(timer);
}

function restartGame() {
  score = 0;
  questionCount = 1;
  answerInput.disabled = false;
  document.querySelector('button').disabled = false;
  feedbackEl.textContent = "";
  scoreEl.textContent = score;
  qCountEl.textContent = questionCount;
  gameOverBox.style.display = "none";
  generateQuestion();
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

generateQuestion();

const confetti = document.getElementById('confetti');
const HEART_COUNT = 15;

for (let i = 0; i < HEART_COUNT; i++) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '♥';

  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = 9 + Math.random() * 15 + 'px';
  heart.style.animationDuration = 6 + Math.random() * 6 + 's';
  heart.style.animationDelay = -Math.random() * 10 + 's';
  heart.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
  heart.style.setProperty('--spin', (Math.random() * 360 - 180) + 'deg');

  confetti.appendChild(heart);
}
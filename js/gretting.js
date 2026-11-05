const typingText = document.getElementById('typingText');
const TYPING_WORDS = 'Selamat ulang tahun 🥳';
const chars = Array.from(TYPING_WORDS);
let charIndex = 0;
let deleting = false;
let typingTimer = null;

function typeLoop() {
  typingText.textContent = chars.slice(0, charIndex).join('');

  let delay = deleting ? 40 : 30 ;

  if (!deleting && charIndex === chars.length) {
    deleting = true;
    delay = 1500;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    delay = 600;
  } else {
    charIndex += deleting ? -1 : 1;
  }

  typingTimer = setTimeout(typeLoop, delay);
}

function startTyping() {
  if (typingTimer === null) typeLoop();
}

playBtn.addEventListener('click', startTyping);
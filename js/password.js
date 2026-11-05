const PASSWORD = '000000';

const passwordInput = document.getElementById('passwordInput');
const submitBtn = document.getElementById('submitBtn');
const wrongPopup = document.getElementById('wrongPopup');
const correctPopup = document.getElementById('correctPopup');
const retryBtn = document.getElementById('retryBtn');
const spinner = document.getElementById('spinner');

function checkPassword() {
  if (passwordInput.value === PASSWORD) {
    correctPopup.classList.add('show');
    setTimeout(() => spinner.classList.add('show'), 1000);
    setTimeout(() => {
      window.location.href = 'main.html';
    }, 6000);
  } else {
    wrongPopup.classList.add('show');
  }
}

submitBtn.addEventListener('click', checkPassword);

passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkPassword();
});

retryBtn.addEventListener('click', () => {
  wrongPopup.classList.remove('show');
  passwordInput.value = '';
  passwordInput.focus();
});


const msgForm = document.getElementById('msgForm');
const msgBtn = document.getElementById('msgBtn');
const msgStatus = document.getElementById('msgStatus');
const sentModal = document.getElementById('sentModal');
const sentOk = document.getElementById('sentOk');
const creditsEl = document.getElementById('creditsEl');
const creditsRoll = document.getElementById('creditsRoll');
const creditsClose = document.getElementById('creditsClose');

function startCredits() {
  creditsEl.classList.add('show');
  setTimeout(() => creditsEl.classList.add('blue'), 800);
  setTimeout(() => creditsEl.classList.add('rolling'), 3500);
}

sentOk.addEventListener('click', () => {
  sentModal.classList.remove('show');
  setTimeout(startCredits, 1000);
});

const creditsObserver = new IntersectionObserver((entries) => {
  const entry = entries[ 0 ];
  if (creditsEl.classList.contains('rolling') && !entry.isIntersecting) {
    creditsEl.classList.add('done');
  }
}, { root: creditsEl, threshold: 0 });

creditsObserver.observe(creditsRoll);

creditsClose.addEventListener('click', () => {
  creditsEl.classList.remove('show', 'blue', 'rolling', 'done');
});

msgForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  msgBtn.disabled = true;
  msgBtn.textContent = 'Mengirim...';
  msgStatus.textContent = '';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(msgForm)
    });
    const data = await res.json();

    if (data.success) {
      msgStatus.textContent = '';
      sentModal.classList.add('show');
      msgForm.reset();
    } else {
      msgStatus.textContent = 'Gagal mengirim: ' + data.message;
    }
  } catch (err) {
    msgStatus.textContent = 'Gagal mengirim, cek koneksi internet lalu coba lagi.';
  }

  msgBtn.disabled = false;
  msgBtn.textContent = 'Kirim';
});
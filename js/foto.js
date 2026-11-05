const book = document.getElementById('book');
const sheets = document.querySelectorAll('.sheet');
const bookPrev = document.getElementById('bookPrev');
const bookNext = document.getElementById('bookNext');

let bookPos = 0;

function updateStack(flippingIndex) {
  sheets.forEach((sheet, i) => {
    const flipped = i < bookPos;
    sheet.classList.toggle('flipped', flipped);
    sheet.style.zIndex = i === flippingIndex ? 100 : (flipped ? i + 1 : sheets.length - i);
  });

  book.classList.toggle('open', bookPos > 0 && bookPos < sheets.length);
  book.classList.toggle('end', bookPos === sheets.length);
}

function turn(dir) {
  const next = bookPos + dir;
  if (next < 0 || next > sheets.length) return;

  const flippingIndex = dir > 0 ? bookPos : next;
  bookPos = next;
  updateStack(flippingIndex);

  setTimeout(() => updateStack(-1), 1000);
}

bookNext.addEventListener('click', () => turn(1));
bookPrev.addEventListener('click', () => turn(-1));

updateStack(-1);

const viewer = document.getElementById('viewer');
const viewerImg = document.getElementById('viewerImg');
const viewerBack = document.getElementById('viewerBack');

const SPECIAL_PASSWORD = '000000';
const pwModal = document.getElementById('pwModal');
const pwInput = document.getElementById('pwInput');
const pwMsg = document.getElementById('pwMsg');
const pwOk = document.getElementById('pwOk');
const pwCancel = document.getElementById('pwCancel');
let pendingPhoto = null;

function openPhoto(photo) {
  const img = photo.querySelector('img');
  viewerImg.src = img.src;
  viewerImg.alt = img.alt;
  viewer.classList.add('show');
  photo.classList.remove('locked');
}

document.querySelectorAll('.photo').forEach((photo) => {
  photo.classList.add('locked');

  photo.addEventListener('click', () => {
    if (photo.dataset.special && photo.classList.contains('locked')) {
      pendingPhoto = photo;
      pwInput.value = '';
      pwMsg.textContent = '';
      pwModal.classList.add('show');
      pwInput.focus();
    } else {
      openPhoto(photo);
    }
  });
});

function checkSpecial() {
  if (pwInput.value === SPECIAL_PASSWORD) {
    pwModal.classList.remove('show');
    openPhoto(pendingPhoto);
    pendingPhoto = null;
  } else {
    pwMsg.textContent = 'Password salah 🤪';
    pwInput.value = '';
  }
}

pwOk.addEventListener('click', checkSpecial);
pwInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkSpecial();
});
pwCancel.addEventListener('click', () => pwModal.classList.remove('show'));


viewerBack.addEventListener('click', () => viewer.classList.remove('show'));
const scrollEl = document.getElementById('scrollEl');
const paperBody = document.getElementById('paperBody');
const scrollText = document.getElementById('scrollText');
const scrollHint = document.getElementById('scrollHint');

const SCROLL_MESSAGE =
  'Tulis isi suratmu di sini.\n\n' +
  'Sambung beberapa bagian dengan tanda plus seperti ini.\n\n' +
  'Nama Pembuat';

const scrollChars = Array.from(SCROLL_MESSAGE);
const SCROLL_TYPE_DELAY = 30;
let scrollOpened = false;

function openScroll() {
  if (scrollOpened) return;
  scrollOpened = true;
  scrollHint.style.display = 'none';

  scrollText.textContent = SCROLL_MESSAGE;
  const full = scrollText.offsetHeight;
  scrollText.textContent = '';

  const maxH = scrollEl.parentElement.clientHeight - 52;
  const target = Math.min(full, maxH);
  const total = scrollChars.length * SCROLL_TYPE_DELAY;

  paperBody.style.transition = 'height ' + total * 0.1 + 'ms linear';
  paperBody.style.height = target + 'px';

  scrollText.classList.add('typing');
  let i = 0;

  function typeScroll() {
    i++;
    scrollText.textContent = scrollChars.slice(0, i).join('');
    paperBody.scrollTop = paperBody.scrollHeight;
    if (i < scrollChars.length) setTimeout(typeScroll, SCROLL_TYPE_DELAY);
  }

  typeScroll();
}

scrollEl.addEventListener('click', openScroll);
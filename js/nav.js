const hamburger = document.getElementById('hamburger');
const sideNav = document.getElementById('sideNav');
const navBackdrop = document.getElementById('navBackdrop');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
const mainVideo = document.getElementById('mainVideo');
const playBtn = document.getElementById('playBtn');
const rec = document.getElementById('rec');
const pages = document.querySelectorAll('.page');
const navLinks = sideNav.querySelectorAll('a');

/** @param {boolean} open */
function setNav(open) {
  hamburger.classList.toggle('active', open);
  sideNav.classList.toggle('show', open);
  navBackdrop.classList.toggle('show', open);
  document.body.classList.toggle('nav-open', open);
  hamburger.setAttribute('aria-expanded', open);
}

function closeOverlays() {
  ['viewer', 'pwModal', 'sentModal'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('show');
  });
}

/** @param {string} id */
function showPage(id) {
  pages.forEach((page) => {
    page.classList.toggle('active', page.id === id);
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
  });

  if (id !== 'main') mainVideo.pause();

  const clip = document.getElementById('clipVideo');
  if (id !== 'video' && clip) clip.pause();

  closeOverlays();
  window.scrollTo(0, 0);
}

hamburger.addEventListener('click', () => {
  setNav(!sideNav.classList.contains('show'));
});

navBackdrop.addEventListener('click', () => setNav(false));

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showPage(link.getAttribute('href').slice(1));
    setNav(false);
  });
});

musicBtn.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.classList.add('playing');
  } else {
    bgMusic.pause();
    musicBtn.classList.remove('playing');
  }
});

playBtn.addEventListener('click', () => {
  if (mainVideo.paused) {
    mainVideo.play();
  } else {
    mainVideo.pause();
  }
});

mainVideo.addEventListener('play', () => rec.classList.add('recording'));
mainVideo.addEventListener('pause', () => rec.classList.remove('recording'));

showPage('main');
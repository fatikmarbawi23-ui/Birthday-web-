const clipVideo = document.getElementById('clipVideo');
const clipRec = document.getElementById('clipRec');
const clipLabel = document.getElementById('clipLabel');
const clipPlayBtn = document.getElementById('clipPlayBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const clips = ['assets/videos/video1.mp4', 'assets/videos/video2.mp4', 'assets/videos/video3.mp4'];
let clipIndex = 0;

function loadClip(index, autoplay) {
  clipIndex = (index + clips.length) % clips.length;
  clipVideo.src = clips[clipIndex];
  clipLabel.textContent = 'FLOWER CAM 0' + (clipIndex + 1) + '/0' + clips.length;
  if (autoplay) clipVideo.play().catch(() => {});
}

clipPlayBtn.addEventListener('click', () => {
  if (clipVideo.paused) {
    clipVideo.play().catch(() => {});
  } else {
    clipVideo.pause();
  }
});

prevBtn.addEventListener('click', () => loadClip(clipIndex - 1, !clipVideo.paused));
nextBtn.addEventListener('click', () => loadClip(clipIndex + 1, !clipVideo.paused));

clipVideo.addEventListener('ended', () => loadClip(clipIndex + 1, true));
clipVideo.addEventListener('play', () => clipRec.classList.add('recording'));
clipVideo.addEventListener('pause', () => clipRec.classList.remove('recording'));

loadClip(0, false);
const audio = document.querySelector('#audio');
const musicControls = document.querySelector('#music-controls');
const playBtn = document.querySelector('#play');
const playBtnIcon = document.querySelector('#play i');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const musicContainer = document.querySelector('#music-container');
const musicTitle = document.querySelector('#music-title');
const coverImage = document.querySelector('#cover-image');
const seekbar = document.querySelector('#seekbar');

// hide browser controls and show custom controls
audio.removeAttribute('controls');
musicControls.style.display = 'flex';

const musicList = ['summer', 'ukulele', 'hey'];
let currentSongIndex = 0;

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', () => {
  seekbar.value = (audio.currentTime / audio.duration) * 100;
});

seekbar.addEventListener('input', (e) => {
  audio.currentTime = (Number(e.target.value) / 100) * audio.duration;
});

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % musicList.length;
  loadSong();
  playSong();
}

function prevSong() {
  if (currentSongIndex === 0) {
    currentSongIndex = musicList.length - 1;
  } else {
    currentSongIndex -= 1;
  }
  loadSong();
  playSong();
}

// Update song details
function loadSong() {
  const title = musicList[currentSongIndex];
  musicTitle.innerHTML = title;
  coverImage.src = `./images/${title}.jpg`;
  audio.src = `./music/${title}.mp3`;
}

function playSong() {
  musicContainer.classList.add('playing');
  playBtnIcon.classList.remove('fa-play');
  playBtnIcon.classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('playing');
  playBtnIcon.classList.add('fa-play');
  playBtnIcon.classList.remove('fa-pause');

  audio.pause();
}

audio.addEventListener('ended', () => {
  musicContainer.classList.remove('playing');
  playBtnIcon.classList.add('fa-play');
  playBtnIcon.classList.remove('fa-pause');
  audio.currentTime = 0;
  nextSong();
});

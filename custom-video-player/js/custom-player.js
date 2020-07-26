const videoPlayer = document.querySelector('video');
const videoControls = document.querySelector('.video-controls');
const playPauseBtn = document.querySelector('#play');
const playPauseIcon = document.querySelector('#play i');
const stopBtn = document.querySelector('#stop');
const videoCurrentTime = document.querySelector('#current-time');
const videoDuration = document.querySelector('#duration');
const videoProgress = document.querySelector('#progress');

// remove the default browser controls from the video, and make the custom controls visible.
videoPlayer.removeAttribute('controls');
videoControls.style.visibility = 'visible';

// playing and pausing the video
playPauseBtn.addEventListener('click', () => {
  playPauseVideo();
});

videoPlayer.addEventListener('click', () => {
  playPauseVideo();
});

// Stopping the video
stopBtn.addEventListener('click', () => {
  stopVideo();
});

// Display video duration
videoPlayer.addEventListener('loadedmetadata', () => {
  videoDuration.innerText = formatTimestamp(Math.ceil(videoPlayer.duration));
});

// Update current time and progress bar
videoPlayer.addEventListener('timeupdate', () => {
  videoCurrentTime.innerText = formatTimestamp(
    Math.ceil(videoPlayer.currentTime)
  );
  videoProgress.value = scaleProgressValue(
    videoPlayer.currentTime,
    videoPlayer.duration
  );
});

videoProgress.addEventListener('input', (e) => {
  videoPlayer.currentTime = scaleTimeValue(
    Number(e.target.value),
    videoPlayer.duration
  );
});

videoProgress.addEventListener('keydown', (e) => {
  const key = e.key;

  if (key === 'ArrowRight' || key === 'ArrowUp') {
    videoProgress.value = Number(videoProgress.value) + 1;
  }

  if (key === 'ArrowLeft' || key === 'ArrowDown') {
    videoProgress.value = Number(videoProgress.value) - 1;
  }
});

// Functions
function playPauseVideo() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');
  } else {
    videoPlayer.pause();
    playPauseIcon.classList.add('fa-play');
    playPauseIcon.classList.remove('fa-pause');
  }
}

function stopVideo() {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  playPauseIcon.classList.add('fa-play');
  playPauseIcon.classList.remove('fa-pause');
}

function formatTimestamp(duration = 0) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes <= 9 ? '0' + minutes : minutes}:${
    seconds <= 9 ? '0' + seconds : seconds
  }`;
}

function scaleProgressValue(value, duration) {
  const scale = 100 / duration;

  return value * scale;
}

function scaleTimeValue(value, duration) {
  const scale = duration / 100;
  return value * scale;
}

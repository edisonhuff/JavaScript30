// Grab page elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Define eventhandlers
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  console.log('toggling', method);
  video[method]();
}

function updateButton() {
  toggle.textContent = this.paused ? '>' : '| |';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) *100;
  progressBar.style.flexBasis = percent + '%';
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Attach eventhandlers
let mouseDown = false;

video.addEventListener( 'click', togglePlay);
video.addEventListener( 'play' , updateButton);
video.addEventListener( 'pause' , updateButton);
video.addEventListener( 'timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

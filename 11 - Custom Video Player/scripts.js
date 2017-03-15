/* Get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
// const fullscreenbtn = player.getElementById("#fullcreenbtn");



/* Build our functions */
function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
  /* turnarary function example below */
  // function togglePlay() {
  //   const method = video.paused ? 'play' : 'pause';
  //   video[method]();
  // }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
  console.log(icon);
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip); //wrapping it in parseFloat will convert it into true number.
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  //need to calculate the length of the progress bar based on the duration of the video
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// function toggleFullScreen(){
// 	if(video.requestFullScreen){
// 		video.requestFullScreen();
// 	} else if(video.webkitRequestFullScreen){
// 		video.webkitRequestFullScreen();
// 	} else if(vid.mozRequestFullScreen){
// 		video.mozRequestFullScreen();
// 	}

/* Hoop up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); //this is sort of our if statement. it checked if the first thing is true then it checks the second thing, and if the first thing is false then it will return false (nothing).

progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// let toggleFullScreen = false;
// fullscreenbtn.addEventListener('click', () => toggleFullScreen = true);

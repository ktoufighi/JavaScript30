//we need to put setInterval in its own variable and call
//it countdown which is a global variable living on window.
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing times when hitting a new button
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  //to set the time interval
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // we take then which is the time it stoped and minus it to time now by running Date.now on it.
    //check if we should stop it!
    if(secondsLeft < 0) {
      clearInterval(countdown);
    }
    //display it
    displayTimeLeft(secondsLeft);
  }, 1000); //each second is a 1000 milliseconds
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60); //timer works in seconds.
  this.reset(); //this refers to the form
})

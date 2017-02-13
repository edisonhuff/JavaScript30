let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000

  displayTimeLeft(seconds);
  displayEndTime(then);

  if (countdown) {
    clearInterval(countdown);
  }

  countdown = setInterval(() => {
    const secondsLeft = (then - Date.now()) / 1000 | 0;

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const mins = seconds / 60 | 0;
  const secs = seconds % 60;
  const display = `${mins}:${secs < 10 ? '0': ''}${secs}`;

  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const mins = end.getMinutes();

  endTimeDisplay.textContent = `Be back at ${
    hour % 12
  }:${
    (mins < 10 ? '0': '') + mins
  } ${
    hour >= 12 ? 'PM' : 'AM'
  }`;
}

buttons.forEach(button => button.addEventListener('click', function(){
  timer(this.dataset.time / 1);
}));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  timer(this.minutes.value * 60);
});

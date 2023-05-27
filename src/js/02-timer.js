import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
    startBtn: document.querySelector("[data-start]"),
    input: document.getElementById('datetime-picker'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};
let chosenDate = 0;
let currentDate = new Date().getTime();
let intervalId = 0;

refs.startBtn.addEventListener('click', countDown);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
flatpickr("#datetime-picker", {
    onClose: function (selectedDates, dateStr, instance) {
        chosenDate = selectedDates[0];
        if (chosenDate < currentDate) {
            refs.startBtn.disabled = true;
            Notiflix.Notify.failure('Please choose a date in the future');
        }
        else {
            refs.startBtn.disabled = false;
            Notiflix.Notify.success('Correct date :)');
        }
    }
    
});
intervalId = setInterval(countDown, 1000);

function countDown() {
    currentDate += 1000;
    const diff = chosenDate - currentDate;
    convertMs(diff);
    function convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        
        // Remaining days
        const days = Math.floor(ms / day);
        // Remaining hours
        const hours = Math.floor((ms % day) / hour);
        // Remaining minutes
        const minutes = Math.floor(((ms % day) % hour) / minute);
        // Remaining seconds
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      
      return { days, hours, minutes, seconds };
    }
    console.log(diff);

    refs.days.textContent = ${days} day${toggleS(
    countDownDate.days
  )} ${addZero(countDownDate.hours)} hour${toggleS(
    countDownDate.hours
  )} ${addZero(countDownDate.minutes)} minute${toggleS(
    countDownDate.minutes
    )
    } ${ addZero(countDownDate.seconds) } second${ toggleS(countDownDate.seconds) };

    function toggleS(number) {
  return number <= 1 ? "" : "s";
    }
    function addZero(number) {
  return String(number).padStart(2, 0);
}
};



console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


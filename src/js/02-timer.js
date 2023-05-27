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
        else if (refs.input.value.trim() !== '') {
            refs.startBtn.disabled = false;
            Notiflix.Notify.success('Correct date :)');
        }
    }
    
});

function countDown() {
    if (!chosenDate) {
        return;
    }
    intervalId = setInterval(countDown, 1000);
    currentDate += 1000;
    const diff = chosenDate - currentDate;
    convertMs(diff);
};


function convertMs(ms) {
    
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
    
  refs.days.textContent = `${addZero(days)}`;
  refs.hours.textContent = `${addZero(hours)}`;
  refs.minutes.textContent = `${addZero(minutes)}`;
  refs.seconds.textContent = `${addZero(seconds)}`;
  
  return { days, hours, minutes, seconds };
};

function addZero(number) {
        return String(number).padStart(2, 0);
};
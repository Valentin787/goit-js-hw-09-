import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputRef = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("button[data-start]");
const wrapDate = document.querySelector("span[data-days]");
const wrapHours = document.querySelector("span[data-hours]");
const wrapMinutes = document.querySelector("span[data-minutes]");
const wrapSeconds = document.querySelector("span[data-seconds]");


const TIME_STEP = 1000;
let isTimerRun = false;
flatpickr(".date", {});
btnStart.setAttribute("disabled", true);


const options = {
  enableTime: true, ////// Включает сборщик времени
  time_24hr: true,//////// -- Отображает указатель времени в 24-часовом режиме без выбора AM / PM, если он включен.
  defaultDate: new Date(),//////// -- Устанавливает начальную выбранную дату (даты).
  minuteIncrement: 1,//////////// -- 	Регулирует шаг ввода минут (включая прокрутку)
  onClose(selectedDates) {
    const datePast = selectedDates[0] < Date.now();
    if (datePast) {
      Notify.failure('Please choose a date in the future.');
      
      btnStart.style.backgroundColor = "#da6c64";
      return;
    }
    btnStart.removeAttribute('disabled');
     btnStart.style.backgroundColor = "rgb(100, 218, 116)";
   
    console.log(selectedDates[0]);
    console.log(datePast) /////// -- 	Функции, срабатывающие каждый раз при закрытии календаря. См.  API событий
  },
  
};
flatpickr(inputRef, options);
const inputFtr = document.querySelector('#datetime-picker')._flatpickr;
console.log(inputFtr)

const addStr = value => value.toString().padStart(2, '0');
console.log(addStr)

const forEachValue = (object, callback) =>
  Object.keys(object).forEach(key => (object[key] = callback(object[key])));
  console.log(forEachValue)

const restartTimer = ({ days, hours, minutes, seconds }) => {
  wrapDate.textContent = days;
  wrapHours.textContent = hours;
  wrapMinutes.textContent = minutes;
  wrapSeconds.textContent = seconds;
};


const getTimeObject = () => {
  const timeMs = inputFtr.selectedDates[0].getTime() - Date.now();
  const timeNew = convertMs(timeMs);
  const timeObject = { ...timeNew };
  forEachValue(timeObject, value => addStr(value));
  return timeObject;
};

const startTimer = () => {
  const timeObject = getTimeObject();
  const isTimeOver = Object.values(timeObject).every(val => val === '00');
  restartTimer(timeObject);

  if (isTimeOver) {
    Notify.success('Time ends up!');
    isTimerRun = false;
    return;
  }

  setTimeout(startTimer, TIME_STEP, timeObject);
};

const onClickBtn = () => {
  
  if (isTimerRun) {
    return
  };

  startTimer();
  Notify.info('Timer is running!');
  isTimerRun = true;
};
console.log(isTimerRun)

btnStart.addEventListener('click', onClickBtn);

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


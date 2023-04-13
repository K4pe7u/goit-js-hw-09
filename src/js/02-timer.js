// Importowanie bibliotek i elementów HTML
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// pobieramy input
const dateInput = document.getElementById('datetime-picker');

// // buttony do zdarzenia interakcja
const startBtn = document.querySelector('[data-start]');
const resetBtn = document.querySelector('[data-reset]');

// pobieramy minutnik, elementy odpowiadające danym jednostkom czasowym
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// // zerowanie czasu na minutniku
let selectedDate;

resetBtn.disabled = true;

// Funkcja konwertująca milisekundy na pozostały czas
const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

// Funkcja dodająca wiodące zera do liczb jednocyfrowych
const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

// Ustawienia flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const date = new Date();
    selectedDate = selectedDates[0].getTime();
    selectedDate < date.getTime()
      ? Notiflix.Report.failure('Wybierz date w przyszłości!')
      : startBtn.removeAttribute('disabled');
  },
};

// Funkcja wywołująca konwersję i wyświetlanie pozostałego czasu

const countdownResetTime = () => {
  selectedDate = null;
  secondsValue.textContent = '00';
  minutesValue.textContent = '00';
  hoursValue.textContent = '00';
  daysValue.textContent = '00';
};

const countdownStartTime = () => {
  if (!selectedDate) {
    return;
  }
  const leftTime = convertMs(selectedDate - new Date());
  if (selectedDate - new Date() > 0) {
    secondsValue.textContent = addLeadingZero(leftTime.seconds);
    minutesValue.textContent = addLeadingZero(leftTime.minutes);
    hoursValue.textContent = addLeadingZero(leftTime.hours);
    daysValue.textContent = addLeadingZero(leftTime.days);
  } else {
    countdownResetTime();
  }
};

//  callbacka dla przycisku start
startBtn.addEventListener('click', () => {
  setInterval(countdownStartTime, 1000);
  startBtn.disabled = true;
  resetBtn.disabled = false;
  dateInput.disabled = true;
});
//  callbacka dla przycisku reset
resetBtn.addEventListener('click', () => {
  dateInput._flatpickr.clear();
  countdownResetTime();
  startBtn.disabled = false;
  resetBtn.disabled = true;
  dateInput.disabled = false;
});

// Inicjalizacja flatpickr
flatpickr(dateInput, options);

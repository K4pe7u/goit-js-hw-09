import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// pobieramy input
const dateInput = document.getElementById('datetime-picker');

// buttony do zdarzenia interakcja
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const resetBtn = document.querySelector('[data-reset]');

// pobieramy minutnik, elementy odpowiadające danym jednostkom czasowym
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// zerowanie czasu na minutniku
let countTime = 0;

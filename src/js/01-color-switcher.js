// Odwołuje się do buttonów
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let changeEl = 0;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// fukcja zmienia kolor w odpowiednim interwale co sekunde (całe body) dodanie wewnątrz funkcji randomHexXolor)
function changerColor() {
  changeEl = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  //   blokada przycisku start
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function changerColorStop() {
  clearInterval(changeEl);

  //   blokada przycisku stop
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
// zdarzenia
startBtn.addEventListener('click', changerColor);
stopBtn.addEventListener('click', changerColorStop);

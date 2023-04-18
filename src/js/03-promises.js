import Notiflix from 'notiflix';

const form = document.querySelector('.form');

const delayInput = form.querySelector('input[name="delay"]');
const stepInput = form.querySelector('input[name="step"]');
const amountInput = form.querySelector('input[name="amount"]');

// const submitBtn = form.querySelector('button[type="submit"]'); -> zbędne

// position -> numer promisa
// delay -> opóźnienie wykonania promisa

function createPromise(position, delay) {
  // wywołanie
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      // generowanie losowego numeru -> jesli większy od 0.3 w zmiennej shouldResolve = resolve(wykonane)
      // jesl nie jest większy = reject
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// zdarzenie buttona, na formie z sumbitem bez query
form.addEventListener('submit', event => {
  event.preventDefault();
  // numbery do wartości wpisanych w inputy
  let firstDelay = +delayInput.value;
  let delayStep = +stepInput.value;
  let amount = +amountInput.value;

  // iteracja amount do wykonania kolejnej funkcji (sprawdzić czy mozna zapisać inaczej )
  for (let i = 0; i < amount; i++) {
    // ok iteracje ujmuje w do działania (suma inputów razy iterowana pozycja (chyba))
    const promiseDelay = firstDelay + i * delayStep;
    createPromise(i + 1, promiseDelay)
      //    if (shouldResolve) {
      // resolve({ position, delay });
      // } else {
      // reject({ position, delay });
      // }
      // then + catch

      // wywołanie tekstowe
      // resolve
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      // reject
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

// sorry za ilość komentarzy


// Zajęcia przykład:
// const formEl = document.querySelector(".form");

// formEl.addEventListener("submit", (ev) => {
//   ev.preventDefault();
  
//   const formData = new FormData(ev.target);
//   const firstDelay = +formData.get("delay");
//   const step = +formData.get("step");
//   const amount = +formData.get("amount");
  
//   for(let i = 0; i < amount; i++) {
//     createPromise(i + 1, firstDelay + i * step)  
//       .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
//   }
 
// })

// function createPromise(position, delay) {
//   return new Promise ((resolve, reject) => {
//     setTimeout(() => {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
// resolve({position, delay});
//   } else {
// reject({position, delay});
//   }
//                      }, delay);
//   });
// }



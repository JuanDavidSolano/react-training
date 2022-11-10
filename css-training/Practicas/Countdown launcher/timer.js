const currentDate = new Date();
const countToDate = currentDate.setDate(currentDate.getDate() + 2);

let previousTimeBetweenDates;
setInterval(() => {
  const timeBetweenDates = Math.ceil((countToDate - new Date()) / 1000);

  if (previousTimeBetweenDates !== timeBetweenDates) {
    flipAll(timeBetweenDates);
  }
  previousTimeBetweenDates = timeBetweenDates;
}, 1000);

function flipAll(time) {
  const seconds = time % 60;
  const minutes = Math.floor((time / 60) % 60);
  const hours = Math.floor(time / 3600) % 24;
  const days = Math.floor(time / 86400);

  const cardDays = document.querySelector("[data-days]");
  const cardHours = document.querySelector("[data-hours]");
  const cardMinutes = document.querySelector("[data-minutes]");
  const cardSeconds = document.querySelector("[data-seconds]");

  flip(cardDays, days);
  flip(cardHours, hours);
  flip(cardMinutes, minutes);
  flip(cardSeconds, seconds);

  console.log(days, hours, minutes, seconds);
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".flip-card__top");
  const bottomHalf = flipCard.querySelector(".flip-card__bottom");

  const startNumber = topHalf.textContent;

  console.info(newNumber, startNumber);

  if (newNumber == startNumber) return;

  if (newNumber < 10) newNumber = `0${newNumber}`;
  const topFlip = document.createElement("div");
  const bottomFlip = document.createElement("div");

  topHalf.textContent = startNumber;
  bottomHalf.textContent = startNumber;

  topFlip.classList.add("top-flip");
  bottomFlip.classList.add("bottom-flip");

  topFlip.textContent = startNumber;
  bottomFlip.textContent = newNumber;

  topFlip.addEventListener("animationstart", (e) => {
    topHalf.textContent = newNumber;
  });

  topFlip.addEventListener("animationend", (e) => {
    topFlip.remove();
  });

  bottomFlip.addEventListener("animationend", (e) => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
  });

  flipCard.append(topFlip, bottomFlip);
}

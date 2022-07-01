"use strict";

// Function to replace the textContent  of an element
const displayElementText = (element, message) => {
  document.querySelector(`${element}`).textContent = message;
};

// Getting the reset values for both score and highscore not to reset them maniually
const scoreHTML = document.querySelector(".score").textContent;
let score = scoreHTML;
const highscoreHTML = document.querySelector(".highscore").textContent;
let highscore = highscoreHTML;

const max = 20;
let secNum = Math.trunc(Math.random() * max + 1);

// flag to test the user has reset the game or not by reloading the page
let enter = 0;

// to show the secNum while developing
// displayElementText(".number", `${secNum}`);

const wrong = (guess) => {
  // we are sure that we won't got negative numbers or numbers hieghr then the max so we tell the user to guess with in the limit 0 : max
  displayElementText(
    ".message",
    guess < secNum
      ? `Higher than ${guess < 0 ? 0 : guess}`
      : `Lower than ${guess > max ? max : guess}`
  );
  score--;
  if (score > 0) {
    displayElementText(".score", `${score}`);
  } else {
    // raising the flag that the user has to reset to play again
    enter = 1;
    displayElementText(".score", "Game Over");
    document.querySelector("body").style.backgroundColor = "#e03131";
  }
};

const right = (guess) => {
  displayElementText(".message", "Congrats!!!");
  highscore = highscore > score ? highscore : score;
  displayElementText(".highscore", `${highscore}`);
  // score = scoreHTML;
  displayElementText(".number", `${secNum}`);
  document.querySelector("body").style.backgroundColor = "#5c940d";
  enter = 1;
};

const checkAction = () => {
  if (enter === 0) {
    let guess = Number(document.querySelector(".guess").value);
    if (document.querySelector(".guess").value === "") {
      displayElementText(".message", "Please enter a number!");
    } else if (guess !== secNum) {
      wrong(guess);
    } else {
      right(guess);
    }
  } else {
    document.querySelector(".number").style.width = "auto";
    document.querySelector(".number").style.padding = "10px";
    displayElementText(".number", "Play Again!");
  }
  document.querySelector(".guess").value = "";
};

const again = () => {
  enter = 0;
  document.querySelector("body").style.backgroundColor = "#222";
  location.reload();
};

// to create two ways of listening wither by clicking check or pressing Enter
document.querySelector(".check").addEventListener("click", checkAction);
document
  .querySelector(".guess")
  .addEventListener("keyup", (e) => (e.key === "Enter" ? checkAction() : ""));

// to create three ways for resetting
document.querySelector(".again").addEventListener("click", again);
document.addEventListener("keyup", (e) => (e.key === "Escape" ? again() : ""));
document
  .querySelector(".number")
  .addEventListener("click", () => (enter !== 0 ? again() : ""));

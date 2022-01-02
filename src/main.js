import "./tailwindcss/tailwind.min.css";
import "./style.css";

import { WORDS } from "./words";
import {
  inputParagraph,
  mistakeElement,
  typingText,
  timeLeftElement,
  wpmElement,
  cpmElement,
  tryAgainElement,
} from "./elements";
import { CORRECT_CLASS, INCORRECT_CLASS } from "./constants";

let charIndex = 0;
let mistakes = 0;

let timer;
const maxTime = 60;
let timeLeft = maxTime;

let isTyping = false;

const generateParagraph = (manyWords = 50) => {
  let words = [];
  for (let i = 0; i < manyWords; i++) {
    const random = Math.floor(Math.random() * WORDS.length);
    words.push(WORDS[random]);
  }
  return words.join(" ");
};

const generateElementOfWord = (paragraph = "") => {
  paragraph.split("").map((char) => {
    const spanTag = document.createElement("span");
    spanTag.textContent = char;
    typingText.appendChild(spanTag);
  });
};

const setFocusingToInputParagraph = () => {
  document.addEventListener("keydown", () => inputParagraph.focus());
  typingText.addEventListener("clcik", () => inputParagraph.focus());
};

const updateTimer = () => {
  if (timeLeft > 0) {
    timeLeft--;
    timeLeftElement.textContent = timeLeft + "s";
  } else {
    clearInterval(timer);
  }
};

const updateTyping = () => {
  // for restart
  inputParagraph.value = "";
  typingText.innerHTML = "";

  const chars = typingText.querySelectorAll("span");
  let typedChars = inputParagraph.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(updateTimer, 1000);
      isTyping = true;
    }
    // if user has not entered any char or passed backspace
    if (typedChars == null) {
      charIndex--;
      if (chars[charIndex].classList.contains(INCORRECT_CLASS)) {
        mistakes--;
      }
      chars[charIndex].classList.remove(CORRECT_CLASS, INCORRECT_CLASS);
    } else {
      // if correct
      if (chars[charIndex].textContent === typedChars) {
        chars[charIndex].classList.add(CORRECT_CLASS);
      } else {
        mistakes++;
        chars[charIndex].classList.add(INCORRECT_CLASS);
      }
      charIndex++;
    }
    chars.forEach((span) => span.classList.remove("active"));
    chars[charIndex].classList.add("active");

    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;
    mistakeElement.textContent = mistakes;
    wpmElement.textContent = wpm;
    cpmElement.textContent = charIndex - mistakes;
  } else {
    inputParagraph.value = "";
    clearInterval(timer);
  }
};

const restart = () => {
  const paragraph = generateParagraph();
  generateElementOfWord(paragraph);
  clearInterval(timer);

  charIndex = 0;
  mistakes = 0;
  timeLeft = maxTime;
  isTyping = false;

  timeLeftElement.textContent = timeLeft + "s";
  mistakeElement.textContent = mistakes;
  wpmElement.textContent = 0;
  cpmElement.textContent = 0;
};

const main = () => {
  const paragraph = generateParagraph();
  generateElementOfWord(paragraph);
  setFocusingToInputParagraph();

  inputParagraph.addEventListener("input", updateTyping);
  tryAgainElement.addEventListener("click", restart);
};

main();

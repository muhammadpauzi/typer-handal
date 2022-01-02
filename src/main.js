import "./tailwindcss/tailwind.min.css";
import "./style.css";

import { WORDS } from "./words";
import { inputParagraph, mistakeElement, typingText } from "./elements";
import { CORRECT_CLASS, INCORRECT_CLASS } from "./constants";

let charIndex = 0;
let mistakes = 0;

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

const updateTyping = () => {
  const chars = typingText.querySelectorAll("span");
  let typedChars = inputParagraph.value.split("")[charIndex];
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

  mistakeElement.textContent = mistakes;
};

const main = () => {
  const paragraph = generateParagraph();
  generateElementOfWord(paragraph);
  setFocusingToInputParagraph();

  inputParagraph.addEventListener("input", updateTyping);
};

main();

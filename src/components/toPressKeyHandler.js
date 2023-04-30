import {
  Page, buttonsArr, myConstants, language, cssClasses,
} from './Page.js';
import DATA from './Data.js';

let textarea;
let virtBtnContainer;

function toClickVirtualBtn(e) {
  textarea = myConstants.textarea;
  const btn = e.target.closest('.btn');

  function switchLanguage() {
    buttonsArr.length = 0;
    virtBtnContainer.removeEventListener('click', toClickVirtualBtn);
    const newKeyboard = new Page().createKeyboard(DATA, language.language);
    document.querySelector(`.${cssClasses.BTNS_CONTAINER}`).replaceWith(newKeyboard);
    newKeyboard.addEventListener('click', toClickVirtualBtn);
  }

  if (btn) {
    if (btn.id === 'Backspace') {
      textarea.value = textarea.value.slice(0, -1);
    } else if (btn.id === 'Ru' && language.language === 'En') {
      language.language = 'Ru';
      switchLanguage();
    } else if (btn.id === 'Ru' && language.language === 'Ru') {
      // textarea.focus();
      textarea.value += '';
    } else if (btn.id === 'En' && language.language === 'Ru') {
      language.language = 'En';
      switchLanguage();
    } else if (btn.id === 'En' && language.language === 'En') {
      textarea.value += '';
    } else {
      textarea.value += btn.textContent;
    }
  }

  textarea.focus();
}

function toKeyDown(e) {
  textarea = myConstants.textarea;
  buttonsArr.forEach((btn) => {
    e.preventDefault();
    if (btn.id === e.code) {
      textarea.value += btn.textContent;
      btn.classList.add('active');
    }
  });
}

function toKeyup(e) {
  buttonsArr.forEach((btn) => {
    if (btn.id === e.code) {
      btn.classList.remove('active');
    }
  });
}

function toPressKeyHandler() {
  virtBtnContainer = myConstants.virtBtnContainer;

  virtBtnContainer.addEventListener('click', toClickVirtualBtn);

  document.addEventListener('keydown', toKeyDown);
  document.addEventListener('keyup', toKeyup);
}

export default toPressKeyHandler;

import {
  buttonsArr, myConstants, language, cssClasses,
} from './Page.js';

let textarea;
let virtBtnContainer;

function toClickVirtualBtn(e) {
  textarea = myConstants.textarea;
  const btn = e.target.closest(`.${cssClasses.BUTTON}`);

  function switchLanguageRu() {
    language.language = 'Ru';
    for (let i = 0; i < buttonsArr.length; i += 1) {
      if (buttonsArr[i].valueRu) {
        buttonsArr[i].textContent = buttonsArr[i].valueRu;
      }
    }
  }

  function switchLanguageEn() {
    language.language = 'En';
    for (let i = 0; i < buttonsArr.length; i += 1) {
      buttonsArr[i].textContent = buttonsArr[i].value;
    }
  }

  if (btn) {
    if (btn.id === 'Backspace') {
      textarea.value = textarea.value.slice(0, -1);
    } else if (btn.id === 'Ru' && language.language === 'En') {
      switchLanguageRu();
    } else if (btn.id === 'Ru' && language.language === 'Ru') {
      textarea.value += '';
    } else if (btn.id === 'En' && language.language === 'Ru') {
      switchLanguageEn();
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

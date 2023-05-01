import {
  buttonsArr, myConstants, language, cssClasses,
} from './Page.js';

const btnsFuncArr = ['Backspace'];

let textarea;
let virtBtnContainer;

function toMouseDownVirtualBtn(e) {
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
    btn.classList.add(cssClasses.ACTIVE);
  }
}

function toMouseUpVirtualBtn(e) {
  const btn = e.target.closest(`.${cssClasses.BUTTON}`);

  if (btn) {
    btn.classList.remove(cssClasses.ACTIVE);
  }

  textarea.focus();
}

function toKeyDown(e) {
  textarea = myConstants.textarea;
  if (!e.defaultPrevented) {
    buttonsArr.forEach(() => {
      if (!btnsFuncArr.includes(e.code)) {
        e.preventDefault();
      }
    });
  }

  buttonsArr.forEach((btn) => {
    if (btn.id === e.code && !btnsFuncArr.includes(e.code)) {
      textarea.value += btn.textContent;
      btn.classList.add('active');
    }

    if (btn.id === e.code && btnsFuncArr.includes(e.code)) {
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

  virtBtnContainer.addEventListener('mousedown', toMouseDownVirtualBtn);
  virtBtnContainer.addEventListener('mouseup', toMouseUpVirtualBtn);

  document.addEventListener('keydown', toKeyDown);
  document.addEventListener('keyup', toKeyup);
}

export default toPressKeyHandler;

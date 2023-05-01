import {
  buttonsArr, myConstants, language, cssClasses,
} from './Page.js';

const btnsFuncObj = {
  BACKSPASE: 'Backspace',
  TAB: 'Tab',
  ENTER: 'Enter',
  CAPSLOCK: 'CapsLock',
};

let textarea;
let virtBtnContainer;
let caps = false;

function toMouseDownVirtualBtn(e) {
  textarea = myConstants.textarea;
  const btn = e.target.closest(`.${cssClasses.BUTTON}`);

  function switchLanguageWithCaps() {
    buttonsArr.forEach((btn) => {
      if (!btn.classList.contains(cssClasses.BUTTON_FUNC)) {
        btn.textContent = btn.textContent.toUpperCase();
      }
    });
  }

  function switchLanguageRu() {
    language.language = 'Ru';
    for (let i = 0; i < buttonsArr.length; i += 1) {
      if (buttonsArr[i].valueRu) {
        buttonsArr[i].textContent = buttonsArr[i].valueRu;
      }
    }
    if (caps) {
      switchLanguageWithCaps();
    }
  }

  function switchLanguageEn() {
    language.language = 'En';
    for (let i = 0; i < buttonsArr.length; i += 1) {
      buttonsArr[i].textContent = buttonsArr[i].value;
    }
    if (caps) {
      switchLanguageWithCaps();
    }
  }

  function toCapsLock() {
    if (!caps) {
      buttonsArr.forEach((btn) => {
        if (!btn.classList.contains(cssClasses.BUTTON_FUNC)) {
          btn.textContent = btn.textContent.toUpperCase();
        }
      });
    } else if (caps) {
      buttonsArr.forEach((btn) => {
        if (!btn.classList.contains(cssClasses.BUTTON_FUNC)) {
          btn.textContent = btn.textContent.toLowerCase();
        }
      });
    }
    caps = !caps;
  }

  if (btn) {
    if (btn.id === btnsFuncObj.BACKSPASE) {
      textarea.value = textarea.value.slice(0, -1);
    } else if (btn.id === btnsFuncObj.TAB) {
      textarea.value += '\t';
    } else if (btn.id === btnsFuncObj.ENTER) {
      textarea.value += '\n';
    } else if (btn.id === btnsFuncObj.CAPSLOCK) {
      toCapsLock();
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
      if (!Object.values(btnsFuncObj).includes(e.code)) {
        e.preventDefault();
      }
    });
  }

  buttonsArr.forEach((btn) => {
    if (btn.id === e.code && !Object.values(btnsFuncObj).includes(e.code)) {
      textarea.value += btn.textContent;
      btn.classList.add(cssClasses.ACTIVE);
    }

    if (btn.id === e.code && Object.values(btnsFuncObj).includes(e.code)) {
      btn.classList.add(cssClasses.ACTIVE);
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

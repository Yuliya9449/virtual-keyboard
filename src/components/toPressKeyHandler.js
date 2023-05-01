import {
  buttonsArr, myConstants, language, cssClasses,
} from './Page.js';

const btnsFuncObj = {
  BACKSPASE: 'Backspace',
  TAB: 'Tab',
  ENTER: 'Enter',
  CAPSLOCK: 'CapsLock',
  SHIFT_LEFT: 'ShiftLeft',
  SHIFT_RIGHT: 'ShiftRight',
  ALT_LEFT: 'AltLeft',
  ALT_RIGHT: 'AltRight',
  DEL: 'Delete',
  CTRL_LEFT: 'ControlLeft',
  CTRL_RIGHT: 'ControlRight',
};

let textarea;
let virtBtnContainer;
let virtCaps = false;
let previousRealCaps = null;

function toUpperCaseVirtBtns() {
  for (let i = 0; i < buttonsArr.length; i += 1) {
    if (!buttonsArr[i].classList.contains(cssClasses.BUTTON_FUNC)) {
      buttonsArr[i].textContent = buttonsArr[i].textContent.toUpperCase();
    }
  }
}

function toLowerCaseVirtBtns() {
  for (let i = 0; i < buttonsArr.length; i += 1) {
    if (!buttonsArr[i].classList.contains(cssClasses.BUTTON_FUNC)) {
      buttonsArr[i].textContent = buttonsArr[i].textContent.toLowerCase();
    }
  }
}

function toCapsLock() {
  if (!virtCaps) {
    toUpperCaseVirtBtns();
  } else if (virtCaps) {
    toLowerCaseVirtBtns();
  }
  virtCaps = !virtCaps;
}

function switchLanguageWithCaps() {
  toUpperCaseVirtBtns();
}

function switchLanguageRu() {
  language.language = 'Ru';
  for (let i = 0; i < buttonsArr.length; i += 1) {
    if (buttonsArr[i].valueRu) {
      buttonsArr[i].textContent = buttonsArr[i].valueRu;
    }
  }
  if (virtCaps) {
    switchLanguageWithCaps();
  }
  localStorage.setItem('lang', language.language);
}

function switchLanguageEn() {
  language.language = 'En';
  for (let i = 0; i < buttonsArr.length; i += 1) {
    buttonsArr[i].textContent = buttonsArr[i].value;
  }
  if (virtCaps) {
    switchLanguageWithCaps();
  }
  localStorage.setItem('lang', language.language);
}

function toShift() {
  if (!virtCaps) {
    toUpperCaseVirtBtns();
  } else {
    toLowerCaseVirtBtns();
  }
}

function toMouseDownVirtualBtn(e) {
  textarea = myConstants.textarea;
  const btn = e.target.closest(`.${cssClasses.BUTTON}`);

  if (btn) {
    // Backspace
    if (btn.id === btnsFuncObj.BACKSPASE) {
      textarea.value = textarea.value.slice(0, -1);
      // Del
    } else if (btn.id === btnsFuncObj.DEL) {
      textarea.value = textarea.value.slice(1);
    } else if (btn.id === btnsFuncObj.ALT_LEFT || btn.id === btnsFuncObj.ALT_RIGHT) {
      textarea.value += '';
    } else if (btn.id === btnsFuncObj.CTRL_LEFT || btn.id === btnsFuncObj.CTRL_RIGHT) {
      textarea.value += '';
    } else if (btn.id === btnsFuncObj.TAB) {
      textarea.value += '\t';
      // Enter
    } else if (btn.id === btnsFuncObj.ENTER) {
      textarea.value += '\n';
      // Caps lock
    } else if (btn.id === btnsFuncObj.CAPSLOCK) {
      toCapsLock();
      // language
    } else if (btn.id === 'Ru' && language.language === 'En') {
      switchLanguageRu();
    } else if (btn.id === 'Ru' && language.language === 'Ru') {
      textarea.value += '';
    } else if (btn.id === 'En' && language.language === 'Ru') {
      switchLanguageEn();
    } else if (btn.id === 'En' && language.language === 'En') {
      textarea.value += '';
      // Shift
    } else if (btn.id === btnsFuncObj.SHIFT_LEFT || btn.id === btnsFuncObj.SHIFT_RIGHT) {
      toShift();
      // rest
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

    // Shift
    if (btn.id === btnsFuncObj.SHIFT_LEFT || btn.id === btnsFuncObj.SHIFT_RIGHT) {
      if (!virtCaps) {
        toLowerCaseVirtBtns();
      } else {
        toUpperCaseVirtBtns();
      }
    }
  }

  textarea.focus();
}

function toKeyDown(e) {
  const currentRealCaps = e.getModifierState('CapsLock');
  textarea = myConstants.textarea;

  if (previousRealCaps === null) {
    previousRealCaps = currentRealCaps;
  }

  buttonsArr.forEach((btn) => {
    if (btn.id === e.code && !Object.values(btnsFuncObj).includes(e.code)) {
      e.preventDefault();
      textarea.value += btn.textContent;
      btn.classList.add(cssClasses.ACTIVE);
    }

    if (btn.id === e.code && Object.values(btnsFuncObj).includes(e.code)) {
      btn.classList.add(cssClasses.ACTIVE);
    }
  });

  if (!previousRealCaps && currentRealCaps) {
    toCapsLock();
    previousRealCaps = !previousRealCaps;
  } else if (previousRealCaps && !currentRealCaps) {
    toCapsLock();
    previousRealCaps = !previousRealCaps;
  }
}

function toKeyup(e) {
  buttonsArr.forEach((btn) => {
    if (btn.id === e.code) {
      btn.classList.remove(cssClasses.ACTIVE);
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

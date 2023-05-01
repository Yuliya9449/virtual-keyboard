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

};

let textarea;
let virtBtnContainer;
let virtCaps = false;
let previousRealCaps = null;

function toCapsLock() {
  if (!virtCaps) {
    buttonsArr.forEach((btn) => {
      if (!btn.classList.contains(cssClasses.BUTTON_FUNC)) {
        btn.textContent = btn.textContent.toUpperCase();
      }
    });
  } else if (virtCaps) {
    buttonsArr.forEach((btn) => {
      if (!btn.classList.contains(cssClasses.BUTTON_FUNC)) {
        btn.textContent = btn.textContent.toLowerCase();
      }
    });
  }
  virtCaps = !virtCaps;
}

function switchLanguageWithCaps() {
  buttonsArr.forEach((button) => {
    if (!button.classList.contains(cssClasses.BUTTON_FUNC)) {
      button.textContent = button.textContent.toUpperCase();
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

function toUpperCaseVirtBtns() {
  buttonsArr.forEach((btn) => {
    if (!btn.classList.contains(cssClasses.BUTTON_FUNC)) {
      btn.textContent = btn.textContent.toUpperCase();
    }
  });
}

function toLowerCaseVirtBtns() {
  buttonsArr.forEach((btn) => {
    if (!btn.classList.contains(cssClasses.BUTTON_FUNC)) {
      btn.textContent = btn.textContent.toLowerCase();
    }
  });
}

function toShift() {
  console.log('111');
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
      // Tab
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
  }
  // Shift
  if (btn.id === btnsFuncObj.SHIFT_LEFT || btn.id === btnsFuncObj.SHIFT_RIGHT) {
    console.log('222');
    if (!virtCaps) {
      toLowerCaseVirtBtns();
    } else {
      toUpperCaseVirtBtns();
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

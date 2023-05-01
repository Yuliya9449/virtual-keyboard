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

function toMouseDownVirtualBtn(e) {
  textarea = myConstants.textarea;
  const btn = e.target.closest(`.${cssClasses.BUTTON}`);

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
  }

  function switchLanguageEn() {
    language.language = 'En';
    for (let i = 0; i < buttonsArr.length; i += 1) {
      buttonsArr[i].textContent = buttonsArr[i].value;
    }
    if (virtCaps) {
      switchLanguageWithCaps();
    }
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
  const currentRealCaps = e.getModifierState('CapsLock');
  if (previousRealCaps === null) {
    previousRealCaps = currentRealCaps;
  }

  console.log(currentRealCaps);

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

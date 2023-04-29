import { buttonsArr, myConstants } from './Page.js';

let textarea;
let virtBtnContainer;

function toClickVirtualBtn(e) {
  textarea = myConstants.textarea;
  const btn = e.target.closest('.btn');
  if (btn) {
    if (btn.id === 'Backspace') {
      textarea.value = textarea.value.slice(0, -1);
    } else {
      textarea.value += btn.value;
    }
  }

  textarea.focus();
}

function toKeyDown(e) {
  buttonsArr.forEach((btn) => {
    if (btn.id === e.code) {
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

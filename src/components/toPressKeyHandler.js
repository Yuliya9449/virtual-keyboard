import { buttonsArr, textarea } from './Page.js';

function toPressKeyHandler() {
  buttonsArr.forEach((virtualBtn) => {
    virtualBtn.addEventListener('click', toClickVirtualBtn);
  });

  document.addEventListener('keydown', toKeyDown);
  document.addEventListener('keyup', toKeyup);
}

function toClickVirtualBtn(e) {
  const btn = e.target;

  if (btn.id === 'Backspace') {
    console.log('Backspace');
  } else {
    textarea.value += btn.value;
  }
  textarea.focus();
}

function toKeyDown(e) {
  buttonsArr.find((btn) => {
    if (btn.id === e.code) {
      btn.classList.add('active');
      // btn.removeEventListener('keydown', toKeyDown);
      // btn.addEventListener('keyup', () => {
      //   console.log('000');
      // });
      return btn;
    }
  });
}

function toKeyup(e) {
  console.log('555');
  console.log(e);
  buttonsArr.forEach((btn) => {
    if (btn.id === e.code) {
      btn.classList.remove('active');
    }
  })
  // const btn = e.target;
  // console.log(btn);
  // if (e) {
  //   btn.classList.remove('active');
  // }
}

export { toPressKeyHandler };

import DATA from './Data.js';

if (!Array.isArray(DATA)) {
  throw TypeError('Keyboard error. DATA array is invalid.');
}

const cssClasses = {
  TITLE: 'title',
  WRAPPER: 'wrapper',
  MAIN_WRAPPER: 'main__wrapper',
  CONTAINER: 'container',
  TEXTAREA: 'textarea',
  ROW: 'row',
  BUTTON: 'btn',
  PARAGRAPH: 'info',
  BUTTON_FUNC: 'btn_func',
  BUTTON_WIDE: 'btn_wide',
  TEXTAREA_CONTAINER: 'textarea-container',
  BTNS_CONTAINER: 'btns-container',
};

const TEXT_HEADING = 'Virtual keyboard';
const TEXT_FOOTER_CREATED = 'The keyboard was created in the operating system windows';
const TEXT_FOOTER_SWITCH = 'Press AltLeft and ShiftLeft to switch language';

const buttonsArr = [];
const myConstants = {};
const language = { language: 'En' };
// const language = {language: 'Ru'};

class Page {
  // constructor(id, value) {
  //   this.id = id;
  //   this.value = value;
  // }

  createHeader() {
    this.header = this.createElement('header');
    this.wrapper = this.createElement('div', cssClasses.WRAPPER);

    this.title = this.createElement('h1', cssClasses.TITLE);
    this.title.innerText = TEXT_HEADING;

    this.wrapper.append(this.title);
    this.header.append(this.wrapper);

    return this.header;
  }

  createMain() {
    this.main = this.createElement('main');
    this.wrapper = this.createElement('div', [cssClasses.WRAPPER, cssClasses.MAIN_WRAPPER]);

    this.textarea = this.createTextarea();
    this.wrapper.append(this.textarea);

    this.keyboard = this.createKeyboard(DATA, language.language);
    this.wrapper.append(this.keyboard);

    this.main.append(this.wrapper);
    return this.main;
  }

  createFooter() {
    this.footer = this.createElement('footer');
    this.wrapper = this.createElement('div', cssClasses.WRAPPER);

    this.paragraph = this.createElement('p', cssClasses.PARAGRAPH);
    this.paragraph.textContent = TEXT_FOOTER_CREATED;
    this.wrapper.append(this.paragraph);

    this.paragraph = this.createElement('p', cssClasses.PARAGRAPH);
    this.paragraph.textContent = TEXT_FOOTER_SWITCH;
    this.wrapper.append(this.paragraph);

    this.footer.append(this.wrapper);

    return this.footer;
  }

  createTextarea() {
    this.container = this.createElement('div', [cssClasses.CONTAINER, cssClasses.TEXTAREA_CONTAINER]);
    this.textarea = this.createElement('textarea', cssClasses.TEXTAREA);
    // this.textarea.focus();
    // textarea = this.textarea;
    myConstants.textarea = this.textarea;
    this.textarea.setAttribute('autofocus', '');
    this.container.append(this.textarea);
    return this.container;
  }

  createKeyboard(data, lang) {
    this.container = this.createElement('div', [cssClasses.CONTAINER, cssClasses.BTNS_CONTAINER]);

    myConstants.virtBtnContainer = this.container;

    data.forEach((keysArr) => {
      this.row = this.createElement('div', cssClasses.ROW);
      keysArr.forEach((key) => {
        this.button = this.createElement('button', cssClasses.BUTTON);
        if (lang === 'En') {
          this.button.textContent = key.value;
        }

        if (lang === 'Ru') {
          if (key.valueRu) {
            this.button.textContent = key.valueRu;
          } else {
            this.button.textContent = key.value;
          }
        }

        this.button.id = key.id;

        if (this.button.id === 'Backspace' || this.button.id === 'Tab' || this.button.id === 'Delete' || this.button.id === 'CapsLock' || this.button.id === 'Enter' || this.button.id === 'ShiftLeft' || this.button.id === 'ShiftRight' || this.button.id === 'ControlLeft' || this.button.id === 'Ru' || this.button.id === 'En' || this.button.id === 'AltLeft' || this.button.id === 'AltRight' || this.button.id === 'ArrowUp' || this.button.id === 'ArrowLeft' || this.button.id === 'ArrowDown' || this.button.id === 'ArrowRight' || this.button.id === 'ControlRight') {
          this.button.classList.add(cssClasses.BUTTON_FUNC);
        }

        if (this.button.id === 'Backspace' || this.button.id === 'Tab' || this.button.id === 'Delete' || this.button.id === 'CapsLock' || this.button.id === 'Enter' || this.button.id === 'ShiftLeft' || this.button.id === 'ShiftRight' || this.button.id === 'Space') {
          this.button.classList.add(cssClasses.BUTTON_WIDE);
        }

        this.button.value = key.value;
        this.button.valueRu = key.valueRu;

        buttonsArr.push(this.button);

        this.row.append(this.button);
      });

      this.container.append(this.row);
    });

    return this.container;
  }

  createElement(tagName, className) {
    this.element = document.createElement(tagName);

    if (Array.isArray(className)) {
      this.element.classList.add(...className);
    } else if (className) {
      this.element.classList.add(className);
    }

    return this.element;
  }
}

export {
  Page, buttonsArr, myConstants, language, cssClasses,
};

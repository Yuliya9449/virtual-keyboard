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
};

const TEXT_HEADING = 'Virtual keyboard';
const TEXT_FOOTER_CREATED = 'The keyboard was created in the operating system windows';
const TEXT_FOOTER_SWITCH = 'Press AltLeft and ShiftLeft to switch language';

const buttonsIdArr = [];

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

    this.keyboard = this.createKeyboard(DATA);
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
    this.container = this.createElement('div', cssClasses.CONTAINER);
    this.textarea = this.createElement('textarea', cssClasses.TEXTAREA);
    this.container.append(this.textarea);
    return this.container;
  }

  createKeyboard(data) {
    this.container = this.createElement('div', cssClasses.CONTAINER);

    data.forEach((keysArr) => {
      this.row = this.createElement('div', cssClasses.ROW);
      keysArr.forEach((key) => {
        this.button = this.createElement('button', cssClasses.BUTTON);
        this.button.textContent = key.value;
        this.button.id = key.id;
        buttonsIdArr.push(this.button.id);

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

export { Page, buttonsIdArr };

// function createComponent(DATA) {
//   if (!Array.isArray(DATA)) {
//     throw TypeError('Keyboard error. DATA array is invalid.');
//   }

//   const component = document.createElement('div');
//   const header = document.createElement('header');

//   const title = document.createElement('h1');
//   title.classList.add(cssClasses.TITLE);
//   title.innerText = 'Virtual keyboard';

//   header.append(title);

//   component.append(header);

//   const main = document.createElement('main');

//   const wrapper = document.createElement('div');
//   wrapper.classList.add(cssClasses.WRAPPER);

//   main.append(wrapper);

//   component.after(main);

//   return component;
// }

// export { createComponent };

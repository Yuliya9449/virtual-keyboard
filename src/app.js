// import { createComponent } from './components/page/Page.js';
// import DATA from './components/Data.js';
import { Page, buttonsArr, textarea } from './components/Page.js';
import { toPressKeyHandler } from './components/toPressKeyHandler.js';

// DOMContentLoaded //!!!!!!!!

const page = new Page();

document.body.append(page.createHeader());
document.body.append(page.createMain());
document.body.append(page.createFooter());

toPressKeyHandler(buttonsArr, textarea);

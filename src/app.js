// import { createComponent } from './components/page/Page.js';
// import DATA from './components/Data.js';
import { Page, buttonsIdArr } from './components/Page.js';
// import DATA from './components/Data.js';

const page = new Page();

document.body.append(page.createHeader());
document.body.append(page.createMain());
document.body.append(page.createFooter());

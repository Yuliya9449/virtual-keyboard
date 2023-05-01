import { Page } from './components/Page.js';
import toPressKeyHandler from './components/toPressKeyHandler.js';

const page = new Page();

document.body.append(page.createHeader());
document.body.append(page.createMain());
document.body.append(page.createFooter());

toPressKeyHandler();

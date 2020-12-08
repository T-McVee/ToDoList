import { pageLoad } from './pageLoad';

const domElements = {
  content: document.querySelector('#content')
};

const myLists = [];

const init = (() => {
  domElements.content.appendChild(pageLoad(myLists));
})();
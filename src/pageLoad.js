import { renderNavBar, renderMain, } from './render'
import { elFactory, updateOrder } from './helpers/functions';
import sortable from '../node_modules/html5sortable/dist/html5sortable.es.js'


const pageLoad = ((myLists) => {
  const navbar = renderNavBar('Tim');
  const main = renderMain(myLists);
  const workSpace = main.querySelector('.work-space');

  const logoutBtn = navbar.querySelector('.logout');
  logoutBtn.addEventListener('click', () => {
    main.style.display = 'none';
    logoutBtn.textContent = 'sign in';
  })

  // Add list Drag n' Drop
  const sortableLists = sortable(workSpace, {
    forcePlaceholderSize: true,
  });

  sortableLists[0].addEventListener('sortupdate', (e) => {
    console.log('pageLoad');
    updateOrder(e, myLists);
  });

  return elFactory('div', {}, navbar, main);
});

export { pageLoad };
import { updateLocalStorage } from './index'
import { renderNavBar, renderMain, } from './render'
import sortable from '../node_modules/html5sortable/dist/html5sortable.es.js'
import { elFactory } from './helpers/helpers';

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
  const sortableList = sortable(workSpace, {
    forcePlaceholderSize: true,
    placeholderClass: 'ph-class',
    hoverClass: 'bg-maroon yellow'
  });

  sortableList[0].addEventListener('sortupdate', (e) => {
    const origin = e.detail.origin.index;
    const destination = e.detail.destination.index;

    let movedItem = myLists.splice(origin, 1);
    myLists.splice(destination, 0, movedItem[0]);
    updateLocalStorage();
  });

  // Add task Drag n' Drop 
  const listEls = workSpace.querySelectorAll('.list');
  listEls.forEach(list => {
    const sortableList = sortable(list.querySelector('.list-body'), {
      forcePlaceholderSize: true,
      placeholderClass: 'ph-class',
      hoverClass: 'bg-maroon yellow'
    });

    sortableList[0].addEventListener('sortupdate', (e) => {
      const origin = e.detail.origin.index;
      const destination = e.detail.destination.index;

      let movedItem = myLists[list.dataset.index].tasks.splice(origin, 1);
      myLists[list.dataset.index].tasks.splice(destination, 0, movedItem[0]);
      updateLocalStorage();
    });

  });

  return elFactory('div', {}, navbar, main);
});

export { pageLoad };
import { updateLocalStorage } from './index'
import { renderNavBar, renderWorkSpace, } from './render'
import sortable from '../node_modules/html5sortable/dist/html5sortable.es.js'

const pageLoad = ((myLists) => {
  const pageContent = document.createElement('div');
  const navbar = renderNavBar()
  const workspace = renderWorkSpace(myLists);

  // Add list Drag n' Drop
  const sortableList = sortable(workspace, {
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
  const listEls = workspace.querySelectorAll('.list');
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

  pageContent.appendChild(navbar);
  pageContent.appendChild(workspace);

  return pageContent;
});

export { pageLoad };
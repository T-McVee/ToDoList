import { elFactory, appendChildren } from './helpers/helpers'
import { createList, listFactory } from './list'
import { createListBtn, renderListBtn } from './createListBtn'


const _renderColumn = ((input) => {
  const col = elFactory('div', { class: 'col' });
  const content = elFactory('div', { class: input.classes }, input.text);
  col.appendChild(content);

  return col;
});

const _renderRow = ((input) => {
  const row = elFactory('div', { class: 'row' });

  input.forEach(el => {
    const col = _renderColumn(el);
    row.appendChild(col);
  });

  return row;
});

const renderNavBar = (() => {
  const nav = document.createElement('nav');
  const row = _renderRow([{ text: 'Kanbanit', classes: 'logo' }]);
  row.classList.add('container');
  row.appendChild(elFactory('i', { class: 'fas fa-bars' }));
  nav.appendChild(row);

  return nav
});

const renderWorkSpace = ((myLists) => {
  const workSpace = elFactory('div', { class: 'work-space container' });
  const newListBtn = createListBtn('+ Create new list', myLists);
  const renderedListBtn = renderListBtn();

  function addNewList() {
    const input = renderedListBtn.firstChild.firstChild.value;

    if (!input) return;
    const list = createList(input, myLists);

    // Add list to myLists
    newListBtn.pushToMyLists(list);
    // Create DOM elements for new list
    workSpace.insertBefore(listFactory(list), workSpace.lastChild);
    renderedListBtn.firstChild.reset();
  }

  renderedListBtn.firstChild.addEventListener('submit', (e) => {
    e.preventDefault();
    addNewList()
  });
  renderedListBtn.lastChild.addEventListener('click', addNewList);


  appendChildren(workSpace, renderedListBtn);

  // Load existing lists
  myLists.forEach(list => {
    workSpace.insertBefore(listFactory(list), workSpace.childNodes[0])
  });

  return workSpace;
});

export {
  renderNavBar,
  renderWorkSpace,
}
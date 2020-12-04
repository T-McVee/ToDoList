import { elFactory } from './helpers/helpers';
import { createListBtn, createList, createListEl } from "./list";


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
  const row = _renderRow([{ text: 'TaskTracker', classes: 'logo' }]);
  row.classList.add('container');
  nav.appendChild(row);

  return nav
});

const renderWorkSpace = ((myLists) => {
  const workSpace = elFactory('div', { class: 'work-space container' });
  const newListBtn = createListBtn('+ Create new list', myLists);
  const renderedListBtn = newListBtn.renderBtn();

  renderedListBtn.lastChild.addEventListener('click', () => {
    const list = createList(
      renderedListBtn.firstChild.firstChild.value,
      newListBtn.listIndex(),
      myLists
    );
    // Add list to myLists
    newListBtn.pushToMyLists(list);
    // Create DOM elements for new list
    workSpace.insertBefore(list.renderList(), workSpace.firstChild)
    renderedListBtn.firstChild.reset();
  });
  workSpace.appendChild(renderedListBtn);

  // Load existing lists
  myLists.forEach(list => {
    workSpace.insertBefore(list.renderList(), workSpace.childNodes[0])
  });

  return workSpace;
});

export {
  renderNavBar,
  renderWorkSpace,
}
import { updateLocalStorage } from './index'
import { elFactory } from './helpers/functions'
import { createList, listFactory } from './list'
import { createListBtn, renderListBtn } from './createListBtn'

const renderNavBar = ((name) => {
  if (name) name = `, ${name}`;
  const logo = elFactory('div', { class: 'logo' }, `Welcome to List Lab${name}`);
  const login = elFactory('div', { class: 'logout', id: 'logout' }, 'start demo');
  const gitHubIcon = elFactory('i', { class: 'fab fa-github-square' });
  const gitHubLink = elFactory('a',
    {
      target: 'blank',
      href: 'https://github.com/T-McVee/to-do-list-project'
    }, gitHubIcon);
  const buttons = elFactory('div', { class: 'buttons' }, login, gitHubLink);

  const container = elFactory('div', { class: 'row container' }, logo, buttons)

  const nav = elFactory('nav', {}, container);




  return nav
});

const renderMain = ((myLists) => {
  const workSpace = elFactory('div', { class: 'work-space' });
  const newListBtn = createListBtn('+ Create new list', myLists);
  const renderedListBtn = renderListBtn();

  renderedListBtn.firstChild.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = renderedListBtn.firstChild.firstChild.value;
    if (!input) return;
    const list = createList({ title: input, index: myLists.length });
    newListBtn.pushToMyLists(list);
    updateLocalStorage();

    // Create DOM elements for new list
    const listEl = listFactory(list);
    workSpace.insertBefore(listEl, workSpace.childNodes[workSpace.childNodes.length]);
    renderedListBtn.firstChild.reset();
  });

  // Load existing lists
  myLists.forEach(list => {
    workSpace.appendChild(listFactory(list));
  });

  const main = elFactory('div', { class: 'main container' }, workSpace, renderedListBtn);

  return main;
});

export {
  renderNavBar,
  renderMain,
}
import { elFactory, appendChildren } from './helpers'

// Title section for lists & tasks - allows user to click to edit title
const textInputModule = (headingType, parentData) => {
  const textModule = elFactory('div', { class: 'text-input-module' });
  const title = _titleFactory(headingType, parentData.title);
  /* const titleWrapper = elFactory('div', { class: 'title-wrapper' }); */
  /* const titleElements = [
    elFactory(headingType, { class: 'title' }, parentData.title),
    elFactory('i', { class: 'far fa-edit hide' }),
  ]; */

  /* titleElements.forEach(el => titleWrapper.appendChild(el)); */
  /*  titleWrapper
     .addEventListener('mouseover', () => titleWrapper.lastChild.classList.toggle('hide'));
   titleWrapper
     .addEventListener('mouseout', () => titleWrapper.lastChild.classList.toggle('hide')); */

  const input = elFactory('input', { type: 'text', class: 'hide' });

  appendChildren(textModule, title, input);



  title.addEventListener('click', () => {
    input.classList.toggle('hide');
    title.classList.toggle('hide');
    input.value = parentData.title;
    input.focus();
  });

  input.addEventListener('focusout', () => {
    input.classList.toggle('hide');
    title.classList.toggle('hide');
    title.firstChild.textContent = input.value;
    parentData.title = input.value;
  });

  return textModule;
};

const _titleFactory = (headingType, text) => {

  const title = elFactory('div', { class: 'title-wrapper' });
  const titleElements = [
    elFactory(headingType, { class: 'title' }, text),
    elFactory('i', { class: 'far fa-edit hide' }),
  ];
  titleElements.forEach(el => title.appendChild(el));

  let hide = () => title.lastChild.classList.toggle('hide');
  title.addEventListener('mouseover', hide);
  title.addEventListener('mouseout', hide);

  return title;
}


const closeFactory = (target) => {
  const close = elFactory('div', { class: 'close' }, 'x');
  close.addEventListener('click', () => {
    document.querySelector(target).remove();
  });

  return close;
}

const _popupHead = (taskData) => {
  const head = elFactory('div', { class: 'popup-head' });
  const title = textInputModule('h2', taskData);
  const priority = elFactory('div', { class: 'priority' }, taskData.priority);
  const closeBtn = closeFactory('.popup-wrapper');
  const elements = [title, priority, closeBtn];

  appendChildren(head, ...elements);

  /* elements.forEach(el => head.appendChild(el)); */

  return head;
}

const _popupBody = (taskData) => {
  const body = elFactory('div', { class: 'popup-body' });
  const descriptionWrapper = elFactory('div', { class: 'description-wrapper' });
  const descriptionTitle = elFactory('h3', { class: 'description-title' }, 'Description:');
  const descriptionInput = elFactory('textarea', { type: 'text', class: 'description-input', placeholder: 'Click to add description...' });

  appendChildren(descriptionWrapper, descriptionTitle, descriptionInput);

  const notesWrapper = elFactory('h3', { class: 'notes-wrapper' });
  const notesTitle = elFactory('div', { class: 'notes' }, 'Notes');
  const notesList = elFactory('div', { class: 'notes' }, 'A note');

  appendChildren(notesWrapper, notesTitle, notesList);
  appendChildren(body, descriptionWrapper, notesWrapper);

  /* elements.forEach(el => body.appendChild(el)); */

  return body;
}

const taskPopUp = (taskData) => {
  const popUpWrapper = elFactory('div', { class: 'popup-wrapper hide' });
  const popUp = elFactory('div', { class: 'popup hide' });
  popUp.appendChild(_popupHead(taskData));
  popUp.appendChild(_popupBody(taskData));
  popUpWrapper.appendChild(popUp);

  return popUpWrapper;
};

export { textInputModule, taskPopUp };
import { elFactory, appendChildren } from './helpers/helpers'
import { textInputModule, inputFactory, selectFactory } from './helpers/components'
import { taskFactory } from './task';

const closePopupFactory = (target) => {
  const close = elFactory('div', { class: 'close' }, 'x');
  close.addEventListener('click', () => {
    document.querySelector(target).remove();
  });

  return close;
}

const _popupHead = (taskData) => {
  const head = elFactory('div', { class: 'popup-head' });
  const titleBlock = elFactory('div', { class: 'title-block' });
  const title = textInputModule('h2', taskData, false);
  const priority = selectFactory(taskData, 'Priority');

  //elFactory('div', { class: `priority ${taskData.returnPriority()}` }, `Priority: ${taskData.returnPriority()}`);
  appendChildren(titleBlock, title, priority);

  const closeBtn = closePopupFactory('.popup-wrapper');
  const elements = [titleBlock, closeBtn];

  appendChildren(head, ...elements);

  return head;
}

const _popupBody = (taskData) => {
  const body = elFactory('div', { class: 'popup-body' });
  const description = elFactory('div', { class: 'description-wrapper' });
  const descriptionTitle = elFactory('h3', { class: 'descrition-title' }, 'Description:');
  const descriptionInput = elFactory('textarea', { class: 'description-input', placeholder: 'Click to add description...' });
  descriptionInput.value = taskData.description;
  appendChildren(description, descriptionTitle, descriptionInput);

  descriptionInput.addEventListener('input', () => {
    taskData.description = descriptionInput.value;
  });

  const notesWrapper = elFactory('h3', { class: 'notes-wrapper' });
  const notesTitle = elFactory('div', { class: 'notes' }, 'Notes');
  const notesList = elFactory('div', { class: 'notes' }, 'A note');

  appendChildren(notesWrapper, notesTitle, notesList);
  appendChildren(body, description, notesWrapper);

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

export { taskPopUp };
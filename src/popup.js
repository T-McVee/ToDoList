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
  const title = textInputModule('h2', taskData, false);
  const priority = selectFactory(taskData, 'Priority');
  const titleBlock = elFactory('div', { class: 'title-block' }, title, priority);

  const closeBtn = closePopupFactory('.popup-wrapper');

  return elFactory('div', { class: 'popup-head' }, titleBlock, closeBtn);
}

const _popupBody = (taskData) => {
  const descriptionTitle = elFactory('h3', { class: 'descrition-title' }, 'Description:');
  const descriptionInput = elFactory('textarea', { class: 'description-input', placeholder: 'Click to add description...' });
  descriptionInput.value = taskData.description;
  descriptionInput.addEventListener('input', () =>
    taskData.description = descriptionInput.value
  );

  const description = elFactory('div', { class: 'description-wrapper' }, descriptionTitle, descriptionInput);

  const notesTitle = elFactory('div', { class: 'notes' }, 'Notes');
  const notesList = elFactory('div', { class: 'notes' }, 'A note');
  const notesWrapper = elFactory('h3', { class: 'notes-wrapper' }, notesTitle, notesList);

  return elFactory('div', { class: 'popup-body' }, description, notesWrapper);
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
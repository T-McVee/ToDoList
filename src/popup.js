import { elFactory, appendChildren } from './helpers/helpers'
import { textInputModule } from './helpers/components'

const closePopupFactory = (target) => {
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
  const closeBtn = closePopupFactory('.popup-wrapper');
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

export { taskPopUp };
import { elFactory } from './helpers/helpers'
import { textInputModule, inputFactory, selectFactory } from './helpers/components'
import { taskFactory } from './task';

const closePopupFactory = (target) => {
  const close = elFactory('div', { class: 'close' }, 'x');
  close.addEventListener('click', () => {
    document.querySelector(target).remove();
  });

  return close;
}

const _popupHead = (taskData, cardTitle) => {
  const title = textInputModule('h2', taskData, false);
  const priority = selectFactory(taskData, 'Priority');
  const titleBlock = elFactory('div', { class: 'title-block' }, title, priority);

  const closeBtn = closePopupFactory('.popup-wrapper');

  const input = title.querySelector('input');

  input.addEventListener('change', () => {
    // working on using eventlisteners to auto update cards when changes are made in title.
    //should also finish fixing the circular structure so you can merge both threads 

    cardTitle.textContent = taskData.title;
    console.log(cardTitle);
  })

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

const taskPopUp = (taskData, cardTitle) => {
  const head = _popupHead(taskData, cardTitle);
  const body = _popupBody(taskData);
  const popUp = elFactory('div', { class: 'popup hide' }, head, body);

  return elFactory('div', { class: 'popup-wrapper hide' }, popUp);
};

export { taskPopUp };
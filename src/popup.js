import { elFactory } from './helpers/functions'
import { textInputModule, selectFactory, notesModule } from './helpers/components'
import { updateLocalStorage } from '.';

const closePopupFactory = (target) => {
  const close = elFactory('div', { class: 'close' }, 'x');
  close.addEventListener('click', () => {
    document.querySelector(target).remove();
  });

  return close;
}

const _popupHead = (taskData, cardTitleEl) => {
  const title = textInputModule('h2', taskData, false, cardTitleEl);
  title.style.color = taskData.setColorTo(taskData.priority);
  const priority = selectFactory(taskData, 'Priority', [title, cardTitleEl]);
  const titleBlock = elFactory('div', { class: 'title-block' }, title, priority);

  const closeBtn = closePopupFactory('.popup-wrapper');
  const input = title.querySelector('input');

  input.addEventListener('change', () => {
    // working on using eventlisteners to auto update cards when changes are made in title.
    cardTitleEl.textContent = taskData.title;
  });

  return elFactory('div', { class: 'popup-head' }, titleBlock, closeBtn);
}

const _popupBody = (taskData) => {
  const descriptionTitle = elFactory('h3', { class: 'description-title' }, 'Description:');
  const descriptionInput = elFactory('textarea', { class: 'description-input', placeholder: 'Add a description...' });
  descriptionInput.value = taskData.description;

  descriptionInput.addEventListener('input', () => {
    taskData.description = descriptionInput.value;
    updateLocalStorage();
  }

  );

  const description = elFactory('div', { class: 'description-wrapper' }, descriptionTitle, descriptionInput);

  const notesTitle = elFactory('h3', {}, 'Notes:');
  const notesList = notesModule(taskData);
  const notesWrapper = elFactory('div', { class: 'notes-wrapper' }, notesTitle, notesList);

  return elFactory('div', { class: 'popup-body' }, description, notesWrapper);
}

const taskPopUp = (taskData, cardTitle) => {
  const head = _popupHead(taskData, cardTitle);
  const body = _popupBody(taskData);
  const popUp = elFactory('div', { class: 'popup hide' }, head, body);

  return elFactory('div', { class: 'popup-wrapper hide' }, popUp);
};

export { taskPopUp };
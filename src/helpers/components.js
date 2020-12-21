import { updateLocalStorage } from '../index'
import { elFactory, appendChildren } from './helpers'

// Title section for lists & tasks - allows user to click to edit title
const textInputModule = (headingType, itemData, editOnLoad, ...targets) => {
  const title = _titleFactory(headingType, itemData.title);
  const input = elFactory('input', { type: 'text', class: 'hide', placeholder: 'Add a title...' });
  const form = elFactory('form', {}, title, input);

  // Set title on submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value) return;
    setTitle();
  })

  // Hide title & display text input on click
  title.addEventListener('click', () => {
    input.classList.remove('hide');
    title.classList.add('hide');
    input.value = itemData.title;
    input.focus();
    input.select();
  });

  // Hide text input and display title on focus out
  input.addEventListener('focusout', setTitle);

  function setTitle() {
    input.classList.add('hide');
    title.classList.remove('hide');
    itemData.title = input.value;
    title.firstChild.textContent = itemData.title;
    targets.forEach(target => target.textContent = itemData.title);
    updateLocalStorage();
  }

  if (editOnLoad && !itemData.title) {
    title.classList.add('hide');
    input.classList.remove('hide');
    input.value = itemData.title;
    setTimeout(() => {
      input.focus();
      input.select();
    }, 0);
  };

  return elFactory('div', { class: 'text-input-module' }, form);
};

const _titleFactory = (headingType, text) => {

  const title = elFactory('div', { class: 'title-wrapper' });
  const titleElements = [
    elFactory(headingType, { class: `title` }, text),
    elFactory('i', { class: 'far fa-edit hide' }),
  ];
  titleElements.forEach(el => title.appendChild(el));

  let hide = () => title.lastChild.classList.toggle('hide');
  title.addEventListener('mouseover', hide);
  title.addEventListener('mouseout', hide);

  return title;
}

const inputFactory = (heading, inputType, inputClass) => {
  const title = elFactory(
    heading.type,
    { class: `${inputClass}-title` },
    heading.title
  );
  const input = elFactory(
    'input',
    {
      type: inputType.type,
      class: `${inputClass}-input`,
      placeholder: inputType.placeholder,
    }
  );

  return elFactory('div', { class: `${inputClass}-wrapper` }, title, input);
}

const selectFactory = (data, labelText, targets) => {
  const wrapper = elFactory('div', { class: 'select-wrapper' });
  const label = elFactory('label', {}, `${labelText}: `);
  const select = elFactory('select', {});
  data.priorityOptions().forEach(option => select.appendChild(option));
  appendChildren(wrapper, label, select);

  select.selectedIndex = data.priority;

  select.addEventListener('change', () => {
    data.priority = select.value;
    targets.forEach(target => target.style.color = data.setColorTo(data.priority));
    updateLocalStorage();
  });

  return wrapper;
}

const notesModule = (taskData) => {
  const input = elFactory(
    'input',
    {
      type: 'text',
      name: 'new-note',
      placeholder: 'Add a note...'
    });
  const submit = elFactory('input', { type: 'submit' });
  const form = elFactory('form', { name: 'notes' }, input, submit);
  const notesList = elFactory('ul', {});

  taskData.notes
    .forEach(note => notesList.insertBefore(elFactory('li', {}, note), notesList.firstChild));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value) return;

    const newNote = elFactory('li', {}, input.value);
    taskData.notes.push(input.value)
    if (notesList.firstChild) {
      notesList.insertBefore(newNote, notesList.firstChild);
    } else {
      notesList.appendChild(newNote);
    }

    form.reset();
    updateLocalStorage();
  });

  return elFactory('div', { class: 'notes' }, form, notesList);
}

const updateColor = new FocusEvent('custom');


export {
  textInputModule,
  inputFactory,
  selectFactory,
  notesModule,
};
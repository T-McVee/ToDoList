import { updateLocalStorage } from '../index'
import { elFactory, appendChildren } from './functions'
import { format } from 'date-fns'

// Title section for lists & tasks - allows user to click to edit title
const textInputModule = (headingType, itemData, editOnLoad, ...targets) => {
  const title = _titleFactory(headingType, itemData.title);
  const input = elFactory('input', { type: 'text', class: 'hide', placeholder: 'Add a title...' });
  const form = elFactory('form', { class: 'form' }, title, input);

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

const formInputFactory = (label, input) => {
  const labelEl = elFactory('label', { for: input.id }, label.text);
  const inputEl = elFactory('input', {
    type: input.type,
    id: input.id,
    name: input.name,
    placeholder: input.placeholder
  });

  const formGroup = elFactory('div', { class: 'form-group' }, labelEl, inputEl);

  return formGroup;
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
  const label = elFactory('label', {}, `${labelText}: `);
  const select = elFactory('select', {});
  data.priorityOptions().forEach(option => select.appendChild(option));
  const wrapper = elFactory('div', { class: 'select-wrapper' }, label, select);

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

  taskData.notes.forEach(note => {
    const noteDate = elFactory('span', {}, ` - ${note.dateCreated}`);
    const noteText = elFactory('li', {}, note.text, noteDate);

    notesList.insertBefore(noteText, notesList.firstChild);
  });



  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value) return;

    const note = {
      text: input.value,
      dateCreated: format(new Date, 'k:m do MMM'),
    }

    taskData.notes.push(note);

    const noteElDate = elFactory('span', {}, ` - ${note.dateCreated}`);
    const noteEl = elFactory('li', {}, note.text, noteElDate);

    if (notesList.firstChild) {
      notesList.insertBefore(noteEl, notesList.firstChild);
    } else {
      notesList.appendChild(noteEl);
    }

    form.reset();
    updateLocalStorage();
  });

  return elFactory('div', { class: 'notes' }, form, notesList);
}

const updateColor = new FocusEvent('custom');


export {
  textInputModule,
  formInputFactory,
  inputFactory,
  selectFactory,
  notesModule,
};
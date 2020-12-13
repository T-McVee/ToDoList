import { updateLocalStorage } from '../index'
import { elFactory, appendChildren } from './helpers'

// Title section for lists & tasks - allows user to click to edit title
const textInputModule = (headingType, itemData, editOnLoad) => {
  const title = _titleFactory(headingType, itemData.title);
  const input = elFactory('input', { type: 'text', class: 'hide', placeholder: 'Add a title...' });

  title.addEventListener('click', () => {
    input.classList.remove('hide');
    title.classList.add('hide');
    input.value = itemData.title;
    input.focus();
    input.select();
  });

  input.addEventListener('focusout', () => {
    input.classList.add('hide');
    title.classList.remove('hide');
    title.firstChild.textContent = input.value;
    itemData.title = input.value;
    updateLocalStorage();
  });


  if (editOnLoad) {
    title.classList.add('hide');
    input.classList.remove('hide');
    input.value = itemData.title;
    setTimeout(() => {
      input.focus();
      input.select();
    }, 0);
  };

  return elFactory('div', { class: 'text-input-module' }, title, input);
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
      placeholder: inputType.placeholder
    }
  );

  return elFactory('div', { class: `${inputClass}-wrapper` }, title, input);
}

/* const inputBlock = (name, titleType, input) => {
  const title = elFactory(`${titleType}`, { class: `${name}-title` }, name);
  const input = elFactory(`${input.type}`, { class: `${name}-input` });
  // if object.type === select look for object.options
  // loop through options running elFactory for each one

  // Finish this off ^^^ 

  const inputT = {
    type: 'select',
    options: [
      { value }
    ]
  }

  return elFactory('div', { class: `${name}-wrapper` }, title, input);
} */

const selectFactory = (data, labelText) => {
  const wrapper = elFactory('div', { class: 'select-wrapper' });
  const label = elFactory('label', {}, `${labelText}: `);
  const select = elFactory('select', {});
  data.priorityOptions().forEach(option => select.appendChild(option));
  appendChildren(wrapper, label, select);

  select.selectedIndex = data.priority;

  select.addEventListener('change', () => {
    data.priority = select.value;
  });

  return wrapper;
}


export {
  textInputModule,
  inputFactory,
  selectFactory,
};
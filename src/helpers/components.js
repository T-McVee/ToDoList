import { updateLocalStorage } from '../index'
import { elFactory, appendChildren } from './helpers'

// Title section for lists & tasks - allows user to click to edit title
const textInputModule = (headingType, itemData, editOnLoad, ...targets) => {
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
    targets.forEach(target => target.textContent = itemData.title);
    updateLocalStorage();
  });

  if (editOnLoad && !itemData.title) {
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

const updateColor = new FocusEvent('custom');


export {
  textInputModule,
  inputFactory,
  selectFactory,
};
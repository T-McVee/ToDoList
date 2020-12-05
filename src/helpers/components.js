import { elFactory, appendChildren } from './helpers'

// Title section for lists & tasks - allows user to click to edit title
const textInputModule = (headingType, itemData) => {
  const textModule = elFactory('div', { class: 'text-input-module' });
  const title = _titleFactory(headingType, itemData.title);
  const input = elFactory('input', { type: 'text', class: 'hide' });

  appendChildren(textModule, title, input);

  title.addEventListener('click', () => {
    input.classList.toggle('hide');
    title.classList.toggle('hide');
    input.value = itemData.title;
    input.focus();
    input.select();
  });

  input.addEventListener('focusout', () => {
    input.classList.toggle('hide');
    title.classList.toggle('hide');
    title.firstChild.textContent = input.value;
    itemData.title = input.value;
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

const inputFactory = (heading, inputType, inputClass) => {
  const inputWrapper = elFactory('div', { class: `${inputClass}-wrapper` });
  const title = elFactory(heading.type, { class: inputClass }, heading.title);
  const input = elFactory('input', { type: inputType });
  console.log(status);

  let elements = [title, input];

  elements.forEach(el => inputWrapper.appendChild(el));

  return inputWrapper;
}


export { textInputModule, inputFactory };
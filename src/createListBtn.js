import { elFactory } from './helpers/helpers'

const _listBtnFunction = (state) => ({
  pushToMyLists: (list) => {
    state.target.push(list);
  },
  log: () => {
    console.log(state.target);
  },
  getIndex: () => {
    return state.target.length;
  }
})

const createListBtn = (text, target) => {
  const state = {
    text,
    target,
    active: false,
  }
  return Object.assign(
    {},
    // _renderListBtn(state),
    _listBtnFunction(state),
  )
}

const renderListBtn = () => {
  const card = elFactory('div', { class: 'new-list' });
  const form = elFactory('form', { id: 'new-list-form' });
  const input = elFactory('input', {
    class: 'hide',
    id: 'list-title-input',
    type: 'text',
    placeholder: 'Enter list title...'
  });
  const btn = elFactory('input', { type: 'submit', id: 'create-list', value: '+ Create new list' });

  form.appendChild(input);
  form.appendChild(btn);
  card.appendChild(form);

  card.addEventListener('mouseenter', () => {
    input.classList.remove('hide');
  })
  card.addEventListener('mouseleave', () => {
    input.classList.add('hide');
  })
  return card;
}

export { createListBtn, renderListBtn };
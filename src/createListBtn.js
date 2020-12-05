import { elFactory } from './helpers/helpers'

const _renderListBtn = (state) => ({
  renderBtn: () => {
    const card = elFactory('div', { class: 'new-list' });
    const form = elFactory('form', { class: 'hide', id: 'new-list-from' });
    const input = elFactory('input', {
      id: 'list-title-input',
      type: 'text',
      placeholder: 'Enter list title...'
    });
    const btn = elFactory('div', { id: 'create-list' }, state.text);

    form.appendChild(input);
    card.appendChild(form);
    card.appendChild(btn);
    card.addEventListener('mouseenter', () => {
      form.classList.remove('hide');
    })
    card.addEventListener('mouseleave', () => {
      form.classList.add('hide');
    })
    return card;
  },
});

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
    _renderListBtn(state),
    _listBtnFunction(state),
  )
}

export { createListBtn };
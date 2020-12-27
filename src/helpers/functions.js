import { updateLocalStorage } from '../index'

const elFactory = (type, attributes, ...children) => {
  const el = document.createElement(type);

  for (let key in attributes) {
    el.setAttribute(key, attributes[key])
  }

  children.forEach(child => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child))
    } else {
      el.appendChild(child);
    }
  })

  return el;
}

const updateBGColor = (status, targetEl) => {
  status ? targetEl.classList.add('light-grey-bg')
    : targetEl.classList.remove('light-grey-bg');
}

const updateTextColor = (status, ...targetEls) => {
  if (status) {
    targetEls.forEach(el => el.classList.add('mid-blue-text'));
  } else {
    targetEls.forEach(el => el.classList.remove('mid-blue-text'));
  }
}

const updateOrder = (event, array) => {
  //console.log(`updateOrder: `, event.detail);
  console.log(`Array: `, array);

  const origin = event.detail.origin.index;
  const destination = event.detail.destination.index;

  let movedItem = array.splice(origin, 1);
  array.splice(destination, 0, movedItem[0]);
  updateLocalStorage();
}

export {
  elFactory,
  updateBGColor,
  updateTextColor,
  updateOrder,
};
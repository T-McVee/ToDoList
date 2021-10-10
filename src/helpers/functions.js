import { updateLocalStorage } from '../index';

const elFactory = (type, attributes, ...children) => {
  const el = document.createElement(type);

  for (let key in attributes) {
    el.setAttribute(key, attributes[key]);
  }

  children.forEach((child) => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  });

  return el;
};

const updateBGColor = (status, targetEl) => {
  status
    ? targetEl.classList.add('light-grey-bg')
    : targetEl.classList.remove('light-grey-bg');
};

const updateTextColor = (status, ...targetEls) => {
  if (status) {
    targetEls.forEach((el) => el.classList.add('mid-blue-text'));
  } else {
    targetEls.forEach((el) => el.classList.remove('mid-blue-text'));
  }
};

const updateOrder = (event, array) => {
  //console.log(`updateOrder: `, event.detail);
  console.log(`Array: `, array);

  const origin = event.detail.origin.index;
  const destination = event.detail.destination.index;

  let movedItem = array.splice(origin, 1);
  array.splice(destination, 0, movedItem[0]);
  updateLocalStorage();
};

// Test for local storage
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export {
  elFactory,
  updateBGColor,
  updateTextColor,
  updateOrder,
  storageAvailable,
};

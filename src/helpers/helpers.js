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

const appendChildren = (parent, ...children) => {
  children.forEach(child => parent.appendChild(child));
};

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

export {
  elFactory,
  appendChildren,
  updateBGColor,
  updateTextColor,
};
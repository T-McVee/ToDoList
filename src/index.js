const domElements = {
  content: document.querySelector('#content')
};

const init = (() => {
  const hello = document.createElement('div');
  hello.classList.add('hello');
  hello.textContent = 'Hello!'
  content.appendChild(hello);
})();
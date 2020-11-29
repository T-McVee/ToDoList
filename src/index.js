import { createTodo } from './todo'

const domElements = {
  content: document.querySelector('#content')
};

const init = (() => {
  const hello = document.createElement('div');
  hello.classList.add('hello');
  hello.textContent = 'Hello!'
  content.appendChild(hello);

  const todo1 = createTodo('Make Breakfast', 'Make a healthy breakfast for Tishy and Tim', '6:45am', 'high');

  const todo2 = createTodo('Workout', 'Excercies the mind and body', '6:45am', 'Medium');

  todo1.logTitle();
  todo1.updateDueDate('7:00am');
  todo1.logDueDate();
  todo1.logNotes();
  todo1.addNote('Vegetarian');
  todo1.logNotes();
  todo2.logDescription();

})();
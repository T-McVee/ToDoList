import { createTodo } from './todo'
import { createList } from './list'
import { pageLoad } from './pageLoad'
import { renderList } from './helpers'



const domElements = {
  content: document.querySelector('#content')
};

const myLists = [];

const init = (() => {
  myLists.unshift(createList('Morning routine'));
  myLists[0].addTodo(createTodo(
    'Make Breakfast', 'Make a healthy breakfast for Tishy and Tim', '6:45am', 'high'
  ));

  myLists[0].addTodo(createTodo(
    'Workout', 'Excercies the mind and body', 'Nov 30th 6:45am', 'Medium'
  ));

  domElements.content.appendChild(pageLoad(myLists));
  domElements.workSpace = document.querySelector('.work-space');
  domElements.newList = document.querySelector('.new-list');
})();



domElements.newList.addEventListener('click', () => {
  myLists.unshift(createList('Evening Routine'));
  domElements.workSpace.insertBefore(renderList(myLists[0]), domElements.workSpace.childNodes[0])
});
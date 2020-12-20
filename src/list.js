import { myLists, updateLocalStorage } from './index'
import { createTask, taskFactory } from "./task"
import { elFactory } from "./helpers/helpers"
import { textInputModule } from './helpers/components'
import datepicker from 'js-datepicker'
import sortable from '../node_modules/html5sortable/dist/html5sortable.es.js'


const _listHead = ((listData) => {
  const title = textInputModule('h2', listData);
  const deleteBtn = elFactory('div', { class: 'delete' }, 'x');

  return elFactory('div', { class: 'list-head' }, title, deleteBtn);
});

const _listBody = ((listData) => {
  const body = elFactory('div', { class: 'list-body' });
  listData.tasks.forEach(task => {
    body.appendChild(taskFactory(task))
  })
  return body;
});

const _listFooter = (() => {
  const newTaskBtn = elFactory('div', { class: 'new-task' }, '+ Add new task');

  return elFactory('div', { class: 'list-footer' }, newTaskBtn);
});

const _updateList = (state) => ({
  changeTitle: (newTitle) => state.title = newTitle,
  addtask: (task) => state.tasks.push(task),
  changeIndex: (newIndex) => state.index = newIndex,
  deleteList: () => myLists.splice(state.index, 1),
});

const _getDetails = (state) => ({
  get title() {
    return state.title;
  },
  get tasks() {
    return state.tasks;
  },
  get index() {
    return state.index;
  },
});

const _logDetails = (state) => ({
  logTasks: () => state.tasks.forEach(task => task.logTitle()),
});

/* List factory */
const createList = ({ title, index, tasks = [] }) => {
  const state = {
    title,
    index,
    tasks: tasks.map(task => createTask(task))
  }

  return Object.assign(
    {},
    _updateList(state),
    _getDetails(state),
    _logDetails(state),
  )
}

const listFactory = (listData) => {
  const head = _listHead(listData);
  const body = _listBody(listData);
  const footer = _listFooter(listData);

  // Delete button
  head.addEventListener('click', (e) => {
    if (e.target.classList != 'delete') return
    listData.deleteList();
    head.parentElement.remove();

    // update index
    for (let i = 0; i < myLists.length; i++) {
      myLists[i].index = i;
    }

    updateLocalStorage();
  })

  // Drag n Drop
  const sortableList = sortable('.list-body', {
    forcePlaceholderSize: true,
    placeholderClass: 'ph-class',
    hoverClass: 'bg-maroon yellow'
  });

  //console.log(sortableList);


  //sortableList[0].addEventListener('sortstart', (e) => console.log(e.target));

  // Create task
  footer.addEventListener('click', (e) => {
    if (e.target.classList != 'new-task') return

    const task = createTask(
      {
        title: "",
        description: '',
        dueDate: 'Due date',
        priority: '1',
        parentIndex: listData.index,
        index: listData.tasks.length,
      });
    listData.addtask(task);
    const taskEl = taskFactory(task);
    const dueDateEl = taskEl.querySelector('.due-date');
    body.appendChild(taskEl);

    const picker = datepicker(dueDateEl, {
      onHide: () => {
        if (!picker.dateSelected) return;
        task.dueDate = picker.dateSelected.toDateString();
        dueDateEl.textContent = task.dueDate;
        updateLocalStorage();
      }
    });
    updateLocalStorage();
  });

  return elFactory('div',
    {
      class: 'list',
      name: listData.title,
      'data-index': listData.index,
      draggable: 'true'
    },
    head,
    body,
    footer
  );
}

export { createList, listFactory };
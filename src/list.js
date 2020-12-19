import { myLists, updateLocalStorage } from './index'
import { createTask, taskFactory } from "./task"
import { elFactory } from "./helpers/helpers"
import { textInputModule } from './helpers/components'
import datepicker from 'js-datepicker'


const _renderListHead = ((listData) => {
  const title = textInputModule('h2', listData);
  const deleteBtn = elFactory('div', { class: 'delete' }, 'x');

  return elFactory('div', { class: 'list-head' }, title, deleteBtn);
});

const _renderListBody = ((listData) => {
  const body = elFactory('div', { class: 'list-body' });
  listData.tasks.forEach(task => {
    body.appendChild(taskFactory(task))
  })
  return body;
});

const _renderListFooter = (() => {
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
  const head = _renderListHead(listData);
  const body = _renderListBody(listData);
  const footer = _renderListFooter(listData);

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

  // Create task
  footer.addEventListener('click', (e) => {
    if (e.target.classList != 'new-task') return

    const task = createTask(
      {
        title: "",
        description: '',
        dueDate: 'Due date',
        priority: '2',
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
        listData.dueDate = picker.dateSelected.toDateString();
        dueDateEl.textContent = listData.dueDate;
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
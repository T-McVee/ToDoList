import { createTask, taskFactory } from "./task"
import { elFactory } from "./helpers/helpers"
import { textInputModule } from './helpers/components'
import datepicker from 'js-datepicker'


const _renderListHead = ((listData) => {
  const head = elFactory('div', { class: 'list-head' });
  const title = textInputModule('h2', listData);
  const deleteBtn = elFactory('div', { class: 'delete' }, 'x');
  head.appendChild(title);
  head.appendChild(deleteBtn);

  return head;
});

const _renderListBody = ((listData) => {
  const body = elFactory('div', { class: 'list-body' });
  listData.tasks.forEach(task => body.appendChild(_renderTask(task)));

  return body;
});

const _renderListFooter = (() => {
  const footer = elFactory('div', { class: 'list-footer' });
  const newTaskBtn = elFactory('div', { class: 'new-task' }, '+ Add new task');
  footer.appendChild(newTaskBtn);

  return footer;
});

const _updateList = (state) => ({
  changeTitle: (newTitle) => state.title = newTitle,
  addtask: (task) => state.tasks.push(task),
  changeIndex: (newIndex) => state.index = newIndex,
  deleteList: () => state.parent.splice([state.index], 1),
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
  get parent() {
    return state.parent;
  }
});

const _logDetails = (state) => ({
  logTasks: () => state.tasks.forEach(task => task.logTitle()),
});

/* List factory */
const createList = (title, parent) => {
  const state = {
    title,
    tasks: [],
    parent,
    index: parent.length,
  }

  return Object.assign(
    {},
    _updateList(state),
    _getDetails(state),
    _logDetails(state),
  )
}

const listFactory = (listData) => {
  const list = elFactory('div', { class: 'list', name: listData.title, 'data-index': listData.index, draggable: 'true' });
  const head = _renderListHead(listData);
  const body = _renderListBody(listData);
  const footer = _renderListFooter(listData);

  // Delete button
  head.lastChild.addEventListener('click', () => {
    // Remove list from main array and update index
    listData.deleteList();
    for (let i = 0; i < listData.parent.length; i++) {
      listData.parent[i].index = i;
    }

    head.parentElement.remove();
  })

  // Create task
  footer.firstChild.addEventListener('click', () => {
    const task = createTask("Add a title", '', 'Due date', '2', listData);
    listData.addtask(task);
    const taskEl = taskFactory(task);
    const dueDateEl = taskEl.lastChild.firstChild;
    body.appendChild(taskEl);


    const picker = datepicker(dueDateEl, {
      onHide: () => {
        if (!picker.dateSelected) return;
        listData.dueDate = picker.dateSelected.toDateString();
        dueDateEl.textContent = listData.dueDate;
      }
    });
  });

  list.appendChild(head);
  list.appendChild(body);
  list.appendChild(footer);

  return list
}

export { createList, listFactory };
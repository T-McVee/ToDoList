import { myLists, updateLocalStorage } from './index'
import { createTask, taskFactory } from "./task"
import { elFactory, updateBGColor, updateTextColor, updateOrder, } from "./helpers/functions"
import { textInputModule } from './helpers/components'
import datepicker from '../node_modules/js-datepicker/dist/datepicker.min.js'
import sortable from '../node_modules/html5sortable/dist/html5sortable.es.js'


const _listHead = ((listData) => {
  const title = textInputModule('h2', listData);
  const deleteBtn = elFactory('div', { class: 'delete' }, 'x');

  return elFactory('div', { class: 'list-head' }, title, deleteBtn);
});

const _listBody = ((listData) => {
  const body = elFactory('div', { class: 'list-body' });
  listData.tasks.forEach(task => {
    const taskEl = taskFactory(task)

    updateBGColor(task.completed, taskEl);
    updateTextColor(task.completed, taskEl.querySelector('.completed'));

    body.appendChild(taskEl);
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
  deleteList: (list) => {
    const listIndex = myLists.indexOf(list);
    const removedList = myLists.splice(listIndex, 1);

    console.log(`Removed list:`, removedList);
  },
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

/* List factory */
const createList = ({ title, tasks = [] }) => {
  const state = {
    title,
    tasks: tasks.map(task => createTask(task))
  }

  return Object.assign(
    {},
    _updateList(state),
    _getDetails(state),
  )
}

const listFactory = (listData) => {
  const head = _listHead(listData);
  const body = _listBody(listData);
  const footer = _listFooter(listData);

  // Delete button
  head.addEventListener('click', (e) => {
    if (e.target.classList != 'delete') return
    listData.deleteList(listData);
    head.parentElement.remove();
    console.log(`After delete: `, myLists);

    updateLocalStorage();
  })

  // Drag n Drop
  const sortableTasks = sortable(body, {
    forcePlaceholderSize: true,
  });

  sortableTasks[0].addEventListener('sortupdate', (e) => updateOrder(e, listData.tasks));

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
    body.appendChild(taskEl);

    // Add date picker
    const dueDateEl = taskEl.querySelector('.due-date');
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
      draggable: 'true'
    },
    head,
    body,
    footer
  );
}

export { createList, listFactory };
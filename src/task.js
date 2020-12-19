import { myLists, updateLocalStorage } from './index'
import { elFactory } from "./helpers/helpers"
import { textInputModule, inputFactory } from "./helpers/components"
import { taskPopUp } from './popup'
import datepicker from 'js-datepicker'

const _updateTask = (state) => ({
  updateTitle: (newTitle) => state.title = newTitle,
  updateDescription: (newDescription) => state.description = newDescription,
  updateDueDate: (newDate) => state.dueDate = newDate,
  updatePriority: (newPriority) => state.priority = newPriority,
  addNote: (input) => state.notes.push(input),
  deleteTask: () => myLists[state.parentIndex].tasks.splice([state.index], 1),
});

const _getDetails = (state) => ({
  get title() {
    return state.title;
  },
  get description() {
    return state.description;
  },
  get dateCreated() {
    return state.dateCreated;
  },
  get dueDate() {
    return state.dueDate;
  },
  get priority() {
    return state.priority;
  },
  get notes() {
    return state.notes;
  },
  get completed() {
    return state.completed;
  },
  get parentIndex() {
    return state.parentIndex;
  },
  get index() {
    return state.index;
  }
})

const _returnPriority = (state) => ({
  returnPriority: () => {
    return state.priority == 0 ? 'low'
      : state.priority == 2 ? 'high'
        : 'medium';
  }
})

const _priorityOptions = (state) => ({
  priorityOptions: () => {
    const options = [
      elFactory('option', { value: '0', name: 'low' }, 'Low'),
      elFactory('option', { value: '1', name: 'medium' }, 'Medium'),
      elFactory('option', { value: '2', name: 'high' }, 'High'),
    ];

    return options;
  }
})


// Task Factory
const createTask = ({
  title,
  description,
  dueDate,
  priority,
  parentIndex,
  index,
  notes = [],
  dateCreated = new Date,
  completed = false,
}) => {
  let state = {
    title,
    description,
    dueDate,
    priority,
    parentIndex,
    index,
    notes,
    dateCreated,
    completed,
  }

  return Object.assign(
    {},
    _getDetails(state),
    _updateTask(state),
    _returnPriority(state),
    _priorityOptions(state),
  );
}

const _taskHead = ((taskData) => {
  const title = textInputModule('h3', taskData, true);
  const deleteBtn = elFactory('div', { class: 'delete' }, 'x');

  return elFactory('div', { class: 'task-head' }, title, deleteBtn);
})

const _taskBody = ((taskData) => {
  const dueDate = elFactory('div', { class: 'due-date' }, taskData.dueDate);
  const completed = inputFactory({ type: 'label', title: 'completed:' }, { type: 'checkbox' }, 'completed');

  dueDate.textContent = taskData.dueDate;

  const checkbox = completed.querySelector('.completed-input');
  if (taskData.completed) checkbox.setAttribute('checked', true);

  checkbox.addEventListener(
    'change', () => {
      taskData.completed = !taskData.completed;
      updateLocalStorage();
    });


  /* const picker = datepicker(dueDate, {
    onHide: () => {
      if (!picker.dateSelected) return;
      taskData.dueDate = picker.dateSelected.toDateString();
      dueDate.textContent = taskData.dueDate;
      updateLocalStorage();
    }
  }); */

  return elFactory('div', { class: 'task-body' }, dueDate, completed);
})

const taskFactory = (taskData) => {
  //console.log(taskData);
  const head = _taskHead(taskData);
  const body = _taskBody(taskData);

  // Delete button
  head.addEventListener('click', (e) => {
    if (e.target.classList != 'delete') return

    // Remove task from List array
    taskData.deleteTask();
    head.parentElement.remove();

    // Update indexes
    for (let i = 0; i < myLists[taskData.parentIndex].tasks.length; i++) {
      myLists[taskData.parentIndex].tasks[i].index = i;
    }

    updateLocalStorage();
  })

  // Open popup
  body.addEventListener('click', (e) => {
    if (e.target !== body) return;
    const cardTitle = head.querySelector('.title');

    const popUp = taskPopUp(taskData, cardTitle);
    const content = document.querySelector('#content');
    content.insertBefore(popUp, content.firstChild);
  });


  return elFactory('div',
    {
      class: 'task',
      'data-index': taskData.index,
      draggable: 'true'
    },
    head,
    body
  );
}

export { createTask, taskFactory };
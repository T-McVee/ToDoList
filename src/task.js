import { myLists, updateLocalStorage } from './index'
import { elFactory, updateBGColor, updateTextColor } from "./helpers/functions"
import { textInputModule } from "./helpers/components"
import { taskPopUp } from './popup'

const _updateTask = (state) => ({
  updateTitle: (newTitle) => state.title = newTitle,
  updateDescription: (newDescription) => state.description = newDescription,
  updateDueDate: (newDate) => state.dueDate = newDate,
  updatePriority: (newPriority) => state.priority = newPriority,
  addNote: (input) => state.notes.push(input),
  deleteTask: (task) => {
    const parentList = myLists.filter(list => list.tasks.includes(task));
    const taskIndex = parentList[0].tasks.indexOf(task)
    const removedTask = parentList[0].tasks.splice(taskIndex, 1);

    console.log(`parentList: `, parentList);
    console.log(`removedTask: `, removedTask);
  },
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
})

const _returnPriority = (state) => ({
  returnPriority: () => {
    return state.priority == 0 ? 'low'
      : state.priority == 2 ? 'high'
        : 'medium';
  }
});

const _setColorTo = () => ({
  setColorTo: (priority) => {
    return priority == 0 ? '#777777'
      : priority == 1 ? '#000000'
        : '#d73333'
  }
});

const _priorityOptions = () => ({
  priorityOptions: () => {
    const options = [
      elFactory('option', { value: '0', name: 'low' }, 'Low'),
      elFactory('option', { value: '1', name: 'medium' }, 'Medium'),
      elFactory('option', { value: '2', name: 'high' }, 'High'),
    ];

    return options;
  }
});


// Task Factory
const createTask = ({
  title,
  description,
  dueDate,
  priority,
  notes = [],
  dateCreated = new Date,
  completed = false,
}) => {
  let state = {
    title,
    description,
    dueDate,
    priority,
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
    _setColorTo(state),
  );
}

const _taskHead = ((taskData) => {
  const title = textInputModule('h3', taskData, true);
  const form = elFactory('form', {}, title);
  const deleteBtn = elFactory('div', { class: 'delete' }, 'x');
  title.style.color = taskData.setColorTo(taskData.priority);

  return elFactory('div', { class: 'task-head' }, form, deleteBtn);
})

const _taskBody = ((taskData) => {
  const dueDate = elFactory('div', { class: 'due-date' }, taskData.dueDate);
  const completed = elFactory('div', { class: 'completed' }, 'completed');
  const taskBody = elFactory('div', { class: 'task-body' }, dueDate, completed);

  // Update completed status
  completed.addEventListener(
    'click', () => {
      taskData.completed = !taskData.completed;
      updateBGColor(taskData.completed, taskBody.parentElement);
      updateTextColor(taskData.completed, completed);
      updateLocalStorage();
    });

  return taskBody;
})

const taskFactory = (taskData) => {
  const head = _taskHead(taskData);
  const body = _taskBody(taskData);

  // Delete button
  head.addEventListener('click', (e) => {
    if (e.target.classList != 'delete') return

    taskData.deleteTask(taskData);
    head.parentElement.remove();

    updateLocalStorage();
  })

  // Open popup
  body.addEventListener('click', (e) => {
    if (e.target !== body) return;
    const taskTitleEl = head.querySelector('.title');

    const popUp = taskPopUp(taskData, taskTitleEl);
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
import { elFactory, appendChildren } from "./helpers/helpers"
import { textInputModule, inputFactory } from "./helpers/components"
import { taskPopUp } from './popup'
import { format } from 'date-fns'


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
})

const _updateTask = (state) => ({
  updateTitle: (newTitle) => state.title = newTitle,
  updateDescription: (newDescription) => state.description = newDescription,
  updateDueDate: (newDate) => state.dueDate = newDate,
  updatePriority: (newPriority) => state.priority = newPriority,
  addNote: (input) => state.notes.push(input),
})

const _taskHead = (taskData) => {
  const head = elFactory('div', { class: 'task-head' });
  const elements = [
    textInputModule('h3', taskData),
    elFactory('div', { class: 'delete' }, 'x'),
  ];

  elements.forEach(el => head.appendChild(el));

  return head;
}

const _taskBody = (taskData) => {
  const body = elFactory('div', { class: 'task-body' });
  const dueDate = elFactory('div', { class: 'due-date' }, taskData.dueDate);
  const completed = inputFactory({ type: 'h4', title: 'completed:' }, { type: 'checkbox' }, 'completed');
  dueDate.addEventListener('click', () => { });

  completed.lastChild.addEventListener(
    'change',
    () => taskData.completed = !taskData.completed
  );

  appendChildren(body, dueDate, completed);

  return body;
}

const _renderTask = (state) => ({
  renderTask: () => {
    const card = elFactory('div', { class: 'task' });
    const head = _taskHead(state);
    const body = _taskBody(state);

    // Remove task from list and DOM
    head.lastChild.addEventListener('click', () => {
      state.parent.splice(state.index, 1);
      for (let i = 0; i < state.parent.length; i++) {
        state.parent[i].index = i;
      }

      head.parentElement.remove();
    })

    body.addEventListener('click', (e) => {
      if (e.target.classList[0] !== 'task-body') return;
      const popUp = taskPopUp(state);
      const body = document.querySelector('body')
      body.insertBefore(popUp, body.firstChild);
    });

    card.appendChild(head);
    card.appendChild(body);

    return card;
  }
});

// Task Factory
const createTask = (title, description, dueDate, priority, parent) => {
  let state = {
    title,
    description,
    dateCreated: new Date(),
    dueDate,
    priority,
    notes: [],
    completed: false,
    parent,
    index: parent.length,
  }

  return Object.assign(
    {},
    _getDetails(state),
    _updateTask(state),
    _renderTask(state),
  )
}

export { createTask };
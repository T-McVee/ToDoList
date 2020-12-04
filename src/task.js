import { elFactory, appendChildren } from "./helpers/helpers";
import { taskPopUp, textInputModule } from "./helpers/components";
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
  dueDate.addEventListener('click', () => { });

  return body.appendChild(dueDate);
}

const _renderTask = (state) => ({
  renderTask: () => {
    const card = elFactory('div', { class: 'task' });
    const head = _taskHead(state);
    const body = _taskBody(state);

    head.lastChild.addEventListener('click', () => {

      // Remove task from list array and update index
      state.parent.splice(state.index, 1);
      for (let i = 0; i < state.parent.length; i++) {
        state.parent[i].index = i;
      }

      // Remove task from DOM
      head.parentElement.remove();
    })

    body.addEventListener('click', () => {
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
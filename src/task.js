import { elFactory, appendChildren } from "./helpers/helpers";
import { taskPopUp, textInputModule } from "./helpers/components";
import { format } from 'date-fns'



const _logDetails = (state) => ({
  logTitle: () => console.log(state.title),
  logDescription: () => console.log(state.description),
  logDateCreated: () => console.log(format(state.dateCreated, 'yyyy/MM/dd kk:mm')),
  logDueDate: () => console.log(state.dueDate),
  logPriority: () => console.log(state.priority),
  logNotes: () => console.log(state.notes),
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
  return head.appendChild(textInputModule('h3', taskData));
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
    const taskHead = _taskHead(state);
    const taskBody = _taskBody(state);

    taskBody.addEventListener('click', () => {
      const popUp = taskPopUp(state);
      const body = document.querySelector('body')
      body.insertBefore(popUp, body.firstChild);
    });

    card.appendChild(taskHead);
    card.appendChild(taskBody);

    return card;
  }
});

// Todo Factory
const createTask = (title, description, dueDate, priority, index) => {
  let state = {
    title,
    description,
    dateCreated: new Date(),
    dueDate,
    priority,
    notes: [],
    index,
  }

  return Object.assign(
    {},
    _logDetails(state),
    _getDetails(state),
    _updateTask(state),
    _renderTask(state),
  )
}

export { createTask };
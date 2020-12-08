import { elFactory, appendChildren } from "./helpers/helpers"
import { textInputModule, inputFactory, priorityGraph } from "./helpers/components"
import { taskPopUp } from './popup'
import { format } from 'date-fns'


const _updateTask = (state) => ({
  updateTitle: (newTitle) => state.title = newTitle,
  updateDescription: (newDescription) => state.description = newDescription,
  updateDueDate: (newDate) => state.dueDate = newDate,
  updatePriority: (newPriority) => state.priority = newPriority,
  addNote: (input) => state.notes.push(input),
  deleteTask: () => state.parent.splice([state.index], 1),
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
  get parent() {
    return state.parent;
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
const createTask = (title, description, dueDate, priority, parentData) => {
  let state = {
    title,
    description,
    dateCreated: new Date(),
    dueDate,
    priority,
    notes: [],
    completed: false,
    parent: parentData.tasks,
    index: `${parentData.index}-${parentData.tasks.length}`,
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
  const head = elFactory('div', { class: 'task-head' });
  const elements = [
    textInputModule('h3', taskData, true),
    elFactory('div', { class: 'delete' }, 'x'),
  ];

  elements.forEach(el => head.appendChild(el));

  return head;
})

const _taskBody = ((taskData) => {
  const body = elFactory('div', { class: 'task-body' });
  const dueDate = elFactory('div', { class: 'due-date' }, taskData.dueDate);
  const completed = inputFactory({ type: 'h4', title: 'completed:' }, { type: 'checkbox' }, 'completed');
  //const priority = priorityGraph(taskData.priority);

  completed.lastChild.addEventListener(
    'change',
    () => taskData.completed = !taskData.completed
  );

  appendChildren(body, dueDate, completed);

  return body;
})

const taskFactory = (taskData) => {
  console.log(taskData);

  const card = elFactory('div', { class: 'task', 'data-index': taskData.index, draggable: 'true' });
  const head = _taskHead(taskData);
  const body = _taskBody(taskData);

  // Delete button
  head.lastChild.addEventListener('click', () => {
    // Remove task from List array & update indexs
    taskData.deleteTask()
    for (let i = 0; i < taskData.parent.length; i++) {
      taskData.parent[i].index = i;
      head.parentElement.dataset.index = `${taskData.parent.index}-${taskData.parent[i].index}`;
    }

    console.log(taskData.parent.parent);

    //console.log(document.querySelector(`[data-index="0"]`));

    //head.parentElement.dataset.index = `${taskData.parent.index}-${taskData.parent[i].index}`;
    //console.log(head.parentElement);


    head.parentElement.remove();
  })

  // Open popup
  body.addEventListener('click', (e) => {
    if (e.target.classList[0] !== 'task-body') return;
    console.log(taskData);

    const popUp = taskPopUp(taskData); // passing state info before methods are attached
    const body = document.querySelector('body')
    body.insertBefore(popUp, body.firstChild);
  });

  card.appendChild(head);
  card.appendChild(body);



  return card;
}

export { createTask, taskFactory };
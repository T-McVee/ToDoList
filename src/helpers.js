const _renderColumn = ((input) => {
  const col = document.createElement('div');
  col.classList.add('col');
  const content = document.createElement('div');
  content.classList.add(input.classes);
  content.textContent = input.text;
  col.appendChild(content);

  return col;
});

const _renderRow = ((input) => {
  const row = document.createElement('div');
  row.classList.add('row');
  input.forEach(el => {
    const col = _renderColumn(el);
    row.appendChild(col);
  });

  return row;
});

const renderNavBar = (() => {
  const nav = document.createElement('nav');
  const row = _renderRow([{ text: 'TaskTracker', classes: 'logo' }]);
  row.classList.add('container');
  nav.appendChild(row);

  return nav
});

const _renderCard = ((cardData) => {
  const card = document.createElement('div');
  card.classList.add('todo');

  const title = document.createElement('h3');
  title.textContent = cardData.title;
  card.appendChild(title);

  const dueDate = document.createElement('div');
  dueDate.classList.add('due-date');
  dueDate.textContent = cardData.dueDate;
  card.appendChild(dueDate);

  return card;
});

const _renderListHead = ((listData) => {
  const head = document.createElement('div');
  head.classList.add('list-head');
  const title = document.createElement('h2');
  title.textContent = listData.title;
  head.appendChild(title);
  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add('delete');
  deleteBtn.textContent = 'x'
  head.appendChild(deleteBtn);

  return head;
});

const _renderListBody = ((listData) => {
  const body = document.createElement('div');
  body.classList.add('list-body');
  listData.todos.forEach(todo => body.appendChild(_renderCard(todo)));

  return body;
});

const _renderListFooter = (() => {
  const footer = document.createElement('div');
  footer.classList.add('list-footer');
  const newTodoBtn = document.createElement('div');
  newTodoBtn.classList.add('new-todo');
  newTodoBtn.textContent = '+ Add new task';
  footer.appendChild(newTodoBtn);

  return footer;
});

const renderList = ((listData) => {
  const list = document.createElement('div');
  list.classList.add('list');
  list.appendChild(_renderListHead(listData));
  list.appendChild(_renderListBody(listData));
  list.appendChild(_renderListFooter(listData));

  return list;
});

const renderWorkSpace = ((lists) => {
  const workSpace = document.createElement('div');
  workSpace.classList.add("work-space");
  workSpace.classList.add("container");
  const newListBtn = document.createElement('div');
  newListBtn.classList.add('new-list');
  newListBtn.textContent = '+ Create new list';
  workSpace.appendChild(newListBtn);
  lists.forEach(list => {
    workSpace.insertBefore(renderList(list), workSpace.childNodes[0])
  })

  return workSpace;
});

export {
  renderNavBar,
  renderWorkSpace,
  renderList
}
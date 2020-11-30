
const logDetails = (state) => ({
  logTodos: () => state.todos.forEach(todo => todo.logTitle()),
});

const getDetails = (state) => ({
  get title() {
    return state.title;
  },
  get todos() {
    return state.todos;
  },
  get index() {
    return state.index;
  },
});

const updateList = (state) => ({
  addTodo: (todo) => state.todos.push(todo),
});

const createList = (title) => {
  const state = {
    title,
    todos: [],
    index: 0,
  }
  return Object.assign(
    {},
    updateList(state),
    logDetails(state),
    getDetails(state),
  )
}

export { createList };
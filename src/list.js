
const logDetails = (state) => ({
  logTodos: () => state.todos.forEach(todo => todo.logTitle()),
})

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
  )
}

export { createList };
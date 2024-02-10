import { defineStore } from "pinia";

export const useTodosStore = defineStore({
  id: "todos",
  state: () => ({
    todos: [],
  }),
  actions: {
    addTodo(text) {
      this.todos.push({
        text,
        done: false,
      });
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleTodo(index) {
      this.todos[index].done = !this.todos[index].done;
    },
  },
  getters: {
    getTodos() {
      return this.todos;
    },
  },
});

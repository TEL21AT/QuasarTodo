<template>
  <q-page>
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newTodo"
        class="col"
        placeholder="Add new task"
        filled
        bg-color="white"
        dense
        @keyup.enter="addTodo"
      >
        <template v-slot:append>
          <q-btn icon="add" flat round dense @click="addTodo" />
        </template>
      </q-input>
    </div>
    <q-list separator bordered>
      <q-item
        v-for="(todo, index) in todos"
        :key="index"
        clickable
        v-ripple
        @click="todo.done = !todo.done"
      >
        <q-item-section avatar>
          <q-checkbox v-model="todo.done" />
        </q-item-section>
        <q-item-section>
          <q-item-label :class="todo.done ? 'text-strike' : ''">
            {{ todo.text }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            icon="delete"
            flat
            dense
            round
            @click="todos.splice(index, 1)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useTodosStore } from "src/stores/todos";

const todosStore = useTodosStore();

const newTodo = ref("");
// const todos = ref([]);
const todos = todosStore.getTodos;

function addTodo() {
  todosStore.addTodo(newTodo.value);
  newTodo.value = "";
}
</script>

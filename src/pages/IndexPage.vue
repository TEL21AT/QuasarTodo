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
import { ref, watch, onMounted } from "vue";
import { useTodosStore } from "src/stores/todos";
// import { useJwtStore } from "src/stores/jwt";
import { useAuth0 } from "@auth0/auth0-vue";

const { isAuthenticated, idTokenClaims } = useAuth0();
const todosStore = useTodosStore();
// const jwtStore = useJwtStore();

// onMounted(() => {
//   console.log("onMounted");
//   console.log(isAuthenticated.value);
//   if (isAuthenticated.value) {
//     console.log("isAuthenticated is true");
//     console.log(isAuthenticated.value);
//     jwtStore.setToken(idTokenClaims.value.__raw);
//   } else {
//     console.log("isAuthenticated is false");
//     jwtStore.clearToken();
//   }
// });
// watch(isAuthenticated.value, (newValue) => {
//   console.log("watching isAuthenticated value");
//   if (newValue) {
//     console.log("inside watch: " + isAuthenticated.value);
//     jwtStore.setToken(idTokenClaims.value.__raw);
//   } else {
//     console.log("isAuthenticated is false");
//     jwtStore.clearToken();
//   }
// });

const newTodo = ref("");
// const todos = ref([]);
const todos = todosStore.getTodos;

function addTodo() {
  todosStore.addTodo(newTodo.value);
  newTodo.value = "";
}
</script>

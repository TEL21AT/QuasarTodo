<template>
  <q-page>
    <pre v-if="isAuthenticated">
      <h2>MovieList</h2>
      <div class="q-pa-md">
        <q-table
          flat bordered
          title="Movie List"
          :rows="movieList"
          :columns="columns"
          row-key="name"
          selection="single"
          v-model:selected="selected"
        />

        <div class="q-mt-md">
          Selected: {{ JSON.stringify(selected) }}
        </div>
        <q-btn @click="deleteMovie()" color="primary" label="Delete Selected Movie" />
      </div>
      <code>{{ user }}</code>
      <h2>Raw token</h2>
      <!-- <code>{{ idTokenClaims.__raw }}</code> -->
      <q-btn @click="copyToken" label="Copy Token" />
    </pre>
  </q-page>
</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import copy from "copy-to-clipboard";
import { ref, watch, onMounted } from "vue";
import { useJwtStore } from "src/stores/jwt";

const jwtStore = useJwtStore();
const selected = ref([]);

const { user, isAuthenticated, idTokenClaims, getAccessTokenSilently } =
  useAuth0();
const movieList = ref([]);

function copyToken(text) {
  copy(jwtStore.getToken);
  // copy(idTokenClaims.value.__raw);
}

onMounted(async () => {
  fetchTable();
});

async function fetchTable() {
  try {
    const response = await fetch("/api/movies", {
      headers: {
        Authorization: `Bearer ${jwtStore.getToken}`,
      },
    });
    const data = await response.json();
    movieList.value = data; // Fill movieList with the returned content
  } catch (error) {
    console.error(error);
  }
}

function deleteMovie() {
  const movieId = selected.value[0]._id;
  console.log("delete movie: " + movieId);
  fetch(`/api/movies/${movieId}`, {
    headers: {
      Authorization: `Bearer ${jwtStore.getToken}`,
    },
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fetchTable();
    });
}

const columns = [
  {
    name: "title",
    required: true,
    label: "Title",
    align: "left",
    field: (row) => row.title,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "director",
    align: "center",
    label: "Director",
    field: "director",
    sortable: true,
  },
  {
    name: "ImdbRate",
    label: "ImdbRating",
    field: "ImdbRate",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  { name: "_id", label: "DocID", field: "_id", sortable: false },
];
</script>

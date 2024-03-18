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
          row-key="_id"
          selection="multiple"
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
import copy from "copy-to-clipboard";
import { ref, watch, onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";

const { isAuthenticated, user, idTokenClaims } = useAuth0();

const selected = ref([]);

const movieList = ref([]);

function copyToken(text) {
  copy(idTokenClaims.value.__raw);
  console.log("Copied token to clipboard and store");
}

onMounted(async () => {
  if (isAuthenticated.value) {
    fetchTable();
  }
});

watch(isAuthenticated.value, (newVal) => {
  if (newVal) {
    fetchTable();
  }
});

async function fetchTable() {
  try {
    const response = await fetch("/api/movies", {
      headers: {
        Authorization: `Bearer ${idTokenClaims.value.__raw}`,
      },
    });
    const data = await response.json();
    console.log("return" + data);
    movieList.value = data; // Fill movieList with the returned content
  } catch (error) {
    console.error(error.message);
  }
}

function deleteMovie() {
  const movieId = selected.value[0]._id;
  console.log("delete movie: " + movieId);
  fetch(`/api/movies/${movieId}`, {
    headers: {
      Authorization: `Bearer ${idTokenClaims.value.__raw}`,
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

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
  copy(idTokenClaims.value.__raw);
  console.log(idTokenClaims.value);
  jwtStore.setToken(idTokenClaims.value.__raw);
}

async function fetchTable() {
  try {
    const response = await fetch("/api/movies", {});
    const data = await response.json();
    // console.log(data);
    movieList.value = data; // Fill movieList with the returned content
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  if (isAuthenticated.value) {
    fetchTable();
  }
});

const fetchData = async () => {
  try {
    // const token = await getAccessTokenSilently();
    const token = jwtStore.getToken;
    const header = {
      Authorization: `Bearer ${token}`,
    };
    console.log(header.Authorization);
    console.log(header);
    const response = await fetch("/api/movies", {
      headers: {
        ...header,
      },
    });
    const data = await response.json();
    console.log(data);
    movieList.value = data; // Fill movieList with the returned content
  } catch (error) {
    console.error(error);
  }
};

watch(isAuthenticated, (newValue) => {
  if (newValue) {
    fetchData();
  } else {
    movieList.value = []; // Clear movieList if isAuthenticated becomes false
  }
});

function deleteMovie() {
  const movieId = selected.value[0]._id;
  console.log("delete movie: " + movieId);
  fetch(`/api/movies/${movieId}`, {
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

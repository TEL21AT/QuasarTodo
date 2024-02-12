<template>
  <div class="q-pa-lg">
    <div class="q-col-gutter-md row items-start">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="col-6 col-md-4 col-lg-3"
      >
        <q-img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path">
          <div class="absolute-bottom text-subtitle1 text-center">
            {{ movie.title }}
          </div>
        </q-img>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const movies = ref([]);

onMounted(async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZGE3YzViNTJhYmE3NGFlMGM5ZTllZGY1N2MwNTMyOSIsInN1YiI6IjY1OTlkMGE1ODc0MWM0MDI1ODk0MWI2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sQR8VoqyKp4TmWwd6XYB-jtDZ21wALDDFgUrXnyfYYk",
      },
    }
  );
  const data = await response.json();
  movies.value = data.results.slice(0, 20);
});
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>

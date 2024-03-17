<template>
  <div v-if="movie">
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el
          label="Movie Feed"
          icon="movie_filter"
          to="/movie-blog"
        />
        <q-breadcrumbs-el :label="movie.title" icon="movie" />
      </q-breadcrumbs>
    </div>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <div class="row">
        <div
          class="col-md-4 flex-center"
          :span="10"
          :style="{ padding: '24px' }"
        >
          <div>
            <img
              class="img"
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            />
          </div>
        </div>
        <div
          class="col-md-8 flex-center"
          :span="12"
          :style="{ 'padding-left': '24px' }"
        >
          <h1 class="post-title">{{ movie.title }}</h1>
          <div class="post-author">
            by {{ productionCompanies }} - {{ productionCountries }}
          </div>
          <br />
          <div class="text-subtitle2">
            Genres:
            <q-chip
              v-for="genre in movie.genres"
              :key="genre.id"
              :label="genre.name"
            />
            <br />
            <br />
          </div>
          <a-divider />
          <div class="text-subtitle2">
            Vote Average: {{ movie.vote_average }}
          </div>
          <div class="text-subtitle2">Runtime: {{ movie.runtime }} minutes</div>
          <div class="text-subtitle2">
            Spoken Languages: {{ spokenLanguages }} <br /><br />
          </div>
          <div>
            {{ movie.overview }}
          </div>
          <a-divider />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <q-spinner />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { QImg, QChip, QSpinner } from "quasar";

const route = useRoute();
const movie = ref(null);
const spokenLanguages = ref("");
const productionCompanies = ref("");
const productionCountries = ref("");

onMounted(async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${route.params.id}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZGE3YzViNTJhYmE3NGFlMGM5ZTllZGY1N2MwNTMyOSIsInN1YiI6IjY1OTlkMGE1ODc0MWM0MDI1ODk0MWI2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sQR8VoqyKp4TmWwd6XYB-jtDZ21wALDDFgUrXnyfYYk",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    movie.value = await response.json();
  } catch (error) {
    console.error("Failed to fetch movie:", error);
  }
  if (movie.value) {
    if (movie.value.spoken_languages) {
      spokenLanguages.value = movie.value.spoken_languages
        .map((lang) => lang.english_name)
        .join(", ");
    }
    if (movie.value.production_companies) {
      productionCompanies.value = movie.value.production_companies
        .map((company) => company.name)
        .join(", ");
    }

    if (movie.value.production_countries) {
      productionCountries.value = movie.value.production_countries
        .map((country) => country.name)
        .join(", ");
    }
  }
});
</script>

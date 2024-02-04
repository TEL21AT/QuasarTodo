<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 400px">
      <q-input v-model="name" label="Your name *" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
const name = ref("");
</script>

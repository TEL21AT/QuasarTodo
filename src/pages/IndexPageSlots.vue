<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 400px">
      <q-input v-model="name">
        <template v-slot:prepend>
          <q-icon name="font_download" />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
const name = ref("");
</script>

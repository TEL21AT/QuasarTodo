<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 400px">
      <q-input
        v-model="name"
        @update:model-value="console.log('I am typing...')"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
const name = ref("");

function modelUpdated() {
  console.log("I am typing...");
}
</script>

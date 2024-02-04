<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 400px">
      <q-input ref="inputRef" v-model="name" />
      <q-btn
        class="q-mt-sm"
        label="Reset Validation"
        @click="reset"
        color="primary"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
const name = ref("");
const inputRef = ref(null);

function reset() {
  inputRef.value.resetValidation();
}
</script>

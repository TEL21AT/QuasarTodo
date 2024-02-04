<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 400px">
      <q-input
        ref="inputRef"
        v-model="name"
        :rules="[
          (val) =>
            (val && val.length > 0 && !val.match(/^\d/)) ||
            'Please type something valid',
        ]"
        @blur="loseFocus()"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
const name = ref("");
const inputRef = ref(null);

function loseFocus() {
  console.log(inputRef.value.hasError);
}
</script>

<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 400px">
      <q-input
        ref="inputRef"
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        :rules="[
          (val) =>
            (val && val.length > 0 && !val.match(/^\d/)) ||
            'Please type something valid',
        ]"
        @update:model-value="modelUpdated()"
        @blur="loseFocus()"
      >
        <template v-slot:prepend>
          <q-icon name="font_download" />
        </template>
      </q-input>
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
function modelUpdated() {
  console.log("I am typing...");
}
function loseFocus() {
  console.log(inputRef.value.hasError);
}
</script>

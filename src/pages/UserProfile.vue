<template>
  <q-page>
    <pre v-if="isAuthenticated">
      <code>{{ user }}</code>
    </pre>
  </q-page>
</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";

const { user, isAuthenticated } = useAuth0();
</script>

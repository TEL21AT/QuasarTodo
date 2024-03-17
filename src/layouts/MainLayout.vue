<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Todo</div>
        <div class="text-subtitle1">Today</div>
      </div>
      <q-img src="~assets/mountains.jpg" class="absolute-top header-image" />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-img
          class="absolute-top"
          src="~assets/mountains.jpg"
          style="height: 192px"
        >
          <div class="absolute-bottom bg-transparent">
            <router-link to="/profile" :class="{ disabled: !isAuthenticated }">
              <q-avatar v-if="isAuthenticated" size="80px">
                <img :src="user.picture" />
              </q-avatar>
            </router-link>
            <div v-if="isAuthenticated">
              <div class="text-weight-bold">{{ user.name }}</div>
              <div>@{{ user.name }}</div>
            </div>
            <div v-else>
              <div class="text-weight-bold">Guest</div>
            </div>
            <q-btn v-if="!isAuthenticated" @click="login">Log in</q-btn>
            <q-btn v-if="isAuthenticated" @click="logoutUser">Log out</q-btn>
          </div>
        </q-img>
        <q-list class="navigation-list">
          <q-item to="/" clickable>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>Todo List</q-item-section>
          </q-item>
          <q-item to="/help" clickable>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>
            <q-item-section>Help</q-item-section>
          </q-item>
          <q-item to="/movie-blog" clickable>
            <q-item-section avatar>
              <q-icon name="movie" />
            </q-item-section>
            <q-item-section>Movie Blog</q-item-section>
          </q-item>
        </q-list>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useJwtStore } from "src/stores/jwt";

const leftDrawerOpen = ref(false);
const { loginWithRedirect, logout, isAuthenticated, user, idTokenClaims } =
  useAuth0();
const jwtStore = useJwtStore();

onMounted(() => {
  console.log("onMounted");
  if (isAuthenticated.value) {
    console.log("isAuthenticated is true");
    jwtStore.setToken(idTokenClaims.value.__raw);
  }
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
function login() {
  loginWithRedirect();
}

function logoutUser() {
  logout({ logoutParams: { returnTo: "http://localhost:9000" } });
}
</script>

<style>
.header-image {
  height: 100%;
  opacity: 0.3;
  z-index: -1;
}
.navigation-list {
  height: calc(100% - 192px);
  margin-top: 192px;
}
</style>

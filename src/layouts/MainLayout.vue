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
            <q-avatar size="80px">
              <img src="~assets/profile.jpg" />
            </q-avatar>
            <div class="text-weight-bold">Daniel Muench</div>
            <div>@danielmuench</div>
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

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
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

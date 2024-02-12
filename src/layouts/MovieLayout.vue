<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat dense round aria-label="Home" @click="$router.push('/')">
            <q-icon name="home" />
          </q-btn>
          Movie Blog
        </q-toolbar-title>

        <!-- Movie dropdown -->
        <q-btn flat label="Movies">
          <q-menu v-hover>
            <q-list style="min-width: 200px">
              <q-item clickable v-close-popup>
                <q-item-section>Top Rated</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Upcoming</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <!-- Search bar -->
        <q-input
          class="on-left"
          ref="search"
          dark
          dense
          standout
          use-input
          hide-selected
          color="black"
          :stack-label="false"
          label="Search or jump to..."
          v-model="text"
          :options="filteredOptions"
          @filter="filter"
          style="width: 300px"
        >
          <template #append>
            <q-icon name="search" class="q-mr-sm" />
          </template>
        </q-input>

        <q-space />

        <!-- Add new movie button -->
        <q-btn round dense class="q-mr-md">
          <q-icon name="add" />
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item clickable v-close-popup>
                <q-item-section>Add Movie</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <!-- Notifications button -->
        <q-btn round dense class="q-mr-md">
          <q-icon name="notifications" />
          <q-badge color="red" floating>1</q-badge>
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item clickable v-close-popup>
                <q-item-section>Sample Message</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <!-- Profile dropdown -->
        <q-btn round dense>
          <q-avatar>
            <img src="~assets/profile.jpg" />
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item clickable v-close-popup>
                <q-item-section>View Profile</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Ratings</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const search = ref("");
</script>

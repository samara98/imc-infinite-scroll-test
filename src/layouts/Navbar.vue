<template>
  <v-app-bar app color="white">
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        min-width="100"
        src="https://imceria.com/images/logo.png"
        width="100"
        transition="scale-transition"
      />
      <v-toolbar-title class="shrink mt-1 hidden-sm-and-down">Infinite Scrolling</v-toolbar-title>
    </div>

    <v-spacer></v-spacer>

    <v-btn href="https://imceria.com/" target="_blank" text>
      <span class="mr-2">Go to Webpage</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

const Navbar = Vue.extend({});

export default Navbar;
</script>

<style></style>

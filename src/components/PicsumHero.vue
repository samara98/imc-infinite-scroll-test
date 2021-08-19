<template>
  <v-container>
    <v-row>
      <v-col v-for="photo in picsumPhotos" :key="photo.id" cols="12" sm="6" md="3">
        <picsum-card :picture="photo"></picsum-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Computed, mapState } from 'vuex';
import PicsumCard from './PicsumeHero/PicsumCard.vue';

interface ComputedProps {
  picsumPhotos: Computed;
}

const PicsumHero = Vue.extend<unknown, unknown, ComputedProps>({
  name: 'PicsumHero',

  components: {
    PicsumCard,
  },

  computed: {
    ...mapState(['picsumPhotos']),
  },
});

export default PicsumHero;
</script>

<style></style>

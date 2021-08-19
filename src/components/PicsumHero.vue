<template>
  <v-container>
    <v-row dense>
      <v-col v-for="photo in photos" :key="photo.id" cols="6" md="3">
        <picsum-card :picture="photo"></picsum-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import PicsumCard from './PicsumeHero/PicsumCard.vue';

interface PicsumPhotoProp {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

interface Props {
  photos: PicsumPhotoProp[];
}

const PicsumHero = Vue.extend<unknown, unknown, unknown, Props>({
  name: 'PictumHero',

  components: {
    PicsumCard,
  },

  props: {
    photos: {
      type: Array,
      default: () => [],
    },
  },
});

export default PicsumHero;
</script>

<style></style>

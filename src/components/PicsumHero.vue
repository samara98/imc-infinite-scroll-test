<template>
  <v-container>
    <picsum-card v-for="photo in photos" :key="photo.id" :picture="photo"></picsum-card>
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

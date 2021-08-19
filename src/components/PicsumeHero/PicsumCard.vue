<template>
  <v-card class="mx-auto my-12" max-width="360">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img height="250" :src="pic"></v-img>

    <v-card-title>
      <a :href="picture.url">{{ picture.author }}</a>
    </v-card-title>

    <v-card-text>
      <a class="my-4 text-subtitle-1" :href="picture.download_url">#{{ picture.id }}</a>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

interface PicsumPhotoProp {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

interface Props {
  picture: PicsumPhotoProp;
}

interface Computed {
  pic: string;
}

const PicsumCard = Vue.extend<unknown, unknown, Computed, Props>({
  name: 'PicsumCard',

  props: {
    picture: {
      type: Object as PropType<PicsumPhotoProp>,
      required: true,
    },
  },

  computed: {
    pic() {
      const urlArr = this.picture.download_url.split('/id/');
      const id = urlArr[1].split('/')[0];
      const url = `${urlArr[0]}/id/${id}/480/320`;
      return url;
    },
  },
});

export default PicsumCard;
</script>

<style></style>

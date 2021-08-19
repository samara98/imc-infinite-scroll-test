<template>
  <v-card class="mx-auto my-12" max-width="360" elevation="8">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <a :href="picture.url" target="_blank">
      <v-img
        :src="pic"
        :lazy-src="`https://picsum.photos/12/8?image=${picture.id}`"
        :aspect-ratio="3 / 2"
        class="grey lighten-2 white--text align-end"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
        <v-card-title>
          {{ picture.author }}
        </v-card-title>
      </v-img>
    </a>

    <v-card-text>
      <a class="my-4 text-subtitle-1" :href="picture.download_url" target="_blank">
        #{{ picture.id }}
      </a>
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
      const url = `${urlArr[0]}/id/${id}/360/240`;
      return url;
    },
  },
});

export default PicsumCard;
</script>

<style></style>

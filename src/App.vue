<template>
  <v-app>
    <navbar></navbar>

    <v-main>
      <picsum-hero :photos="photos"></picsum-hero>
    </v-main>

    <div class="mb-5">
      <v-progress-linear color="primary" indeterminate reverse v-show="loading"></v-progress-linear>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from './layouts/Navbar.vue';
import PicsumHero from './components/PicsumHero.vue';
import { picsumApi2 } from './api/picsum-api';

interface PicsumPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

interface Data {
  photos: PicsumPhoto[];
  page: number;
  loading: boolean;
}

interface Methods {
  fetchPicsumPhotos: () => void;
  handleScroll: () => void;
}

const App = Vue.extend<Data, Methods, unknown>({
  name: 'App',

  components: {
    Navbar,
    PicsumHero,
  },

  created() {
    this.fetchPicsumPhotos();
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  data: () => ({
    photos: [],
    page: 1,
    loading: false,
  }),

  methods: {
    async fetchPicsumPhotos(limit = 20) {
      this.loading = true;
      try {
        const photosResp = await picsumApi2.get<PicsumPhoto[]>(
          `/list?page=${this.page}&limit=${limit}`,
        );
        this.photos.push(...photosResp.data);
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    handleScroll() {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.page++;
        this.fetchPicsumPhotos();
      }
    },
  },
});

export default App;
</script>

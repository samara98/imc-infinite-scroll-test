<template>
  <v-app>
    <navbar></navbar>

    <v-main>
      <picsum-hero></picsum-hero>
    </v-main>

    <div class="mt-6 mb-6">
      <v-progress-linear
        color="primary"
        indeterminate
        reverse
        v-show="picsumLoading"
      ></v-progress-linear>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from './layouts/Navbar.vue';
import PicsumHero from './components/PicsumHero.vue';
import { PicsumPhotos } from './types/picsum';
import { ActionMethod, Computed, mapActions, mapMutations, mapState, MutationMethod } from 'vuex';
import { PICSUM_ACTION_FETCH_PHOTOS, PICSUM_MUTATION_INCREMENT_PAGE } from './store/types';

interface DataProps {
  photos: PicsumPhotos;
  page: number;
  loading: boolean;
}

interface ComputedProps {
  picsumLoading: Computed;
}

interface MethodsProps {
  [PICSUM_MUTATION_INCREMENT_PAGE]: MutationMethod;
  [PICSUM_ACTION_FETCH_PHOTOS]: ActionMethod;
  handleScroll: () => void;
}

const App = Vue.extend<DataProps, MethodsProps, ComputedProps>({
  name: 'App',

  components: {
    Navbar,
    PicsumHero,
  },

  created() {
    this[PICSUM_ACTION_FETCH_PHOTOS]();
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  computed: {
    ...mapState(['picsumLoading']),
  },

  methods: {
    ...mapMutations([PICSUM_MUTATION_INCREMENT_PAGE]),
    ...mapActions([PICSUM_ACTION_FETCH_PHOTOS]),
    handleScroll() {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this[PICSUM_MUTATION_INCREMENT_PAGE]();
        this[PICSUM_ACTION_FETCH_PHOTOS]();
      }
    },
  },
});

export default App;
</script>

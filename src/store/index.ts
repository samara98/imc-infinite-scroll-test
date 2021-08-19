import { picsumApi2 } from '@/api/picsum-api';
import { PicsumPhotos } from '@/types/picsum';
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import {
  PICSUM_ACTION_FETCH_PHOTOS,
  PICSUM_MUTATION_INCREMENT_PAGE,
  PICSUM_MUTATION_SET_ERROR,
  PICSUM_MUTATION_SET_PHOTOS,
} from './types';

Vue.use(Vuex);

interface StateProps {
  picsumPhotos: PicsumPhotos;
  picsumError: any;
  picsumLoading: boolean;
  picsumPage: number;
}

const store = new Vuex.Store<StateProps>({
  state: {
    picsumPhotos: [],
    picsumError: null,
    picsumLoading: false,
    picsumPage: 0,
  },
  mutations: {
    [PICSUM_MUTATION_INCREMENT_PAGE](state) {
      state.picsumPage++;
    },
    [PICSUM_MUTATION_SET_PHOTOS](state, payload: PicsumPhotos) {
      state.picsumPhotos.push(...payload);
      state.picsumError = null;
      state.picsumLoading = false;
    },
    [PICSUM_MUTATION_SET_ERROR](state, payload) {
      state.picsumError = payload;
      state.picsumLoading = false;
    },
  },
  actions: {
    async [PICSUM_ACTION_FETCH_PHOTOS]({ state, commit }) {
      state.picsumLoading = true;
      try {
        const photosResp = await picsumApi2.get<PicsumPhotos>(
          `/list?page=${state.picsumPage}&limit=${20}`,
        );
        commit(PICSUM_MUTATION_SET_PHOTOS, photosResp.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          commit(PICSUM_MUTATION_SET_ERROR, err.response?.data);
        } else {
          commit(PICSUM_MUTATION_SET_ERROR, err);
        }
      }
    },
  },
  modules: {},
});

export default store;

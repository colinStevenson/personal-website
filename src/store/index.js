import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
  introOpen: true
};

const mutations = {
  toggleIntro(state, isOpen){
	  state.introOpen = isOpen;
  },
};

const getters = {
  introOpen: state => state.introOpen 
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  mutations,
  strict: debug,
});
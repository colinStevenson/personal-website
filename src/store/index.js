import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import photoset from './modules/photoset';
import photo from './modules/photo';

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        photo,
        photoset,
    }
})
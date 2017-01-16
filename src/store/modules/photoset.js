import Flickr from '../../api/flickr/flickr';
import types from '../mutation-types';

const state = {
    all: [],
    photosetsById: {},
};

const mutations = {
    [types.RECEIVE_PHOTOSETS](state, photosets) {
        state.all = photosets;
    },
    [types.RECIEVE_PHOTOSET](state, photoset) {
        if (photoset && photoset.id) {
            state.photosetsById[photoset.id] = photoset;
        }
    },
};

const getters = {
    photosets(state) {
        return state.all;
    },
    photosetsById(state) {
        return state.photosetsById;
    },
};

const actions = {
    getPhotosets({ commit }) {
        Flickr.photosets.getList({ 'user_id': '70247946@N00' }, function(x, response) {
            let photosets = response && response.photosets && response.photosets.photoset ? response.photosets.photoset : [];

            //for debugging purposes
            window.photosets = photosets;

            commit(types.RECEIVE_PHOTOSETS, photosets);
        })
    },
    getPhotoset({ commit }, id) {
        Flickr.photosets.getInfo({ 'photoset_id': id, 'user_id': '70247946@N00' }, function(x, response) {
            if (response && response.photoset && response.photoset.id) {
                commit(types.RECIEVE_PHOTOSET, response.photoset);
            } else {
                console.error("photosets.getInfo", response)
            }
        })
    },
};

export default {
    actions,
    getters,
    state,
    mutations
};
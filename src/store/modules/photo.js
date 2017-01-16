import Flickr from '../../api/flickr/flickr';
import types from '../mutation-types';

const state = {
    sizesById: {},
};

const actions = {
    requestPhotoSizes({ commit }, id) {
        Flickr.photos.getSizes({ 'photo_id': id }, function(x, response) {
            if (response && response.sizes && response.sizes.size) {
                commit(types.RECEIVE_SIZES, { id: id, photo: response.sizes.size });
            } else {
                console.error("photos.getSizes", response, id);
            }
        })
    }
};

const getters = {
    photoSizes(state) {
        return state.sizesById;
    }
};

const mutations = {
    [types.RECEIVE_SIZES](state, data) {
        if (data.photo && data.id) {
            state.sizesById[data.id] = data.photo;
            // console.log("recieved sizes data", data.id)
        }
    }
};

export default {
    actions,
    getters,
    state,
    mutations
}
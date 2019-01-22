import Vue from 'vue';
import Vuex from 'vuex';

import MutationTypes from './_mutations';
import ActionTypes from './_actions';

import menu from './menu'

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    modules: {
        menu
    }
})

export {
    store,
    MutationTypes as mutations,
    ActionTypes as actions
}

export default store;
import mutations from './_mutations';
import actions from './_actions';

export default {
    state: {
        menu: 0
    },
    getters: {
        getMenu: (state) => {
            return state.menu;
        }
    },
    mutations: {
        [mutations.SET_MENU]: (state, menu) => {
            state.menu = menu;
        }
    },
    actions: {
        [actions.setMenu]: ({ commit }, menu) => {
            commit(mutations.SET_MENU, menu);
        }
    }
}
import mutations from './_mutations';
import actions from './_actions';
import Api from '../api';

export default {
    state: {
        cards: []
    },
    getters: {
        getCards: (state) => {
            return state.cards;
        }
    },
    mutations: {
        [mutations.GET_CARDS]: (state, cards) => {
            state.cards = cards;
        }
    },
    actions: {
        [actions.getCards]: ({ commit }) => {
            Api.card.getCards()
                .then((cards) => {
                    commit(mutations.GET_CARDS, cards);
                })
        }
    }
}
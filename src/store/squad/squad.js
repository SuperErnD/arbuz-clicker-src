export default {
    state: ()=>({
        activeSquad: {},
        mySquad: {},
    }),
    mutations: {
        ADD_ACTIVE_SQUAD(state, item) {
            state.activeSquad = item
        },
        ADD_MY_SQUAD(state, item) {
            state.mySquad = item
        },
    },
    actions: {
        SAVE_ACTIVE_SQUAD({commit}, item) {
            commit('ADD_ACTIVE_SQUAD', item)
        },
        SAVE_MY_SQUAD({commit}, item) {
            commit('ADD_MY_SQUAD', item)
        }
    },
    getters: {
        GET_ACTIVE_SQUAD: state => {
            return state.activeSquad
        },
        GET_MY_SQUAD: state => {
            return state.mySquad
        },
    }
}
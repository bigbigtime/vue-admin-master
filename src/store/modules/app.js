const state = {
    collapse: JSON.parse(sessionStorage.getItem('collapse')) || false,
    token: "",
    username: ""
}
const getters = {}
const mutations = {
    SET_COLLAPSE(state){
        state.collapse = !state.collapse;
        sessionStorage.setItem('collapse', String(state.collapse))
    },
}
const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};

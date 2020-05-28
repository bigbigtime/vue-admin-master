import { setToken, setUsername } from "@/utils/cookies";
import { Login } from "@/api/login";
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
    SET_TOKEN(state, value){
        state.token = value;
        setToken(value);
    },
    SET_USERNAME(state, value){
        state.username = value;
        setUsername(value);
    }
}
const actions = {
    loginAction(content, repuestData) {
        return new Promise((resolve, reject) => {
            Login(repuestData).then((response) => {
                let data = response.data
                content.commit('SET_TOKEN', data.token);
                content.commit('SET_USERNAME', data.username);
                setToken(data.token);
                setUsername(data.username);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};

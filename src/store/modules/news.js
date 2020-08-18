// API
import { GetCategory } from "@/api/news";
// Vuex
const state = {}
const getters = {}
const mutations = {}
const actions = {
    categoryAction(content, repuestData) {
        return new Promise((resolve, reject) => {
            GetCategory(repuestData).then((response) => {
               
                resolve(response.data)
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

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        access_token: localStorage.getItem('access_token') || null,
        is_logged: localStorage.getItem('access_token') != null,
        user: localStorage.getItem('user') || null
    },
    getters: {
        getAccessToken(state) {
            return state.access_token;
        },
        isLogged(state) {
            return state.access_token !== null;
        },
        user(state) {
            return JSON.parse(state.user);
        }
    },
    mutations: {
        storeAuthData(state, data) {
            state.access_token = data.access_token;
            state.is_logged = true;
            state.user = JSON.stringify(data.user);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
        },
        logout(state) {
            state.access_token = null;
            state.is_logged = false;
            state.user = null;
            localStorage.clear();
        }
    },
    actions: {
        login({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('/login', data)
                    .then((res) => {
                        let response = res.data.data;
                        commit('storeAuthData', response);
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })

        },
        register({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('/register', data)
                    .then((res) => {
                        let response = res.data.data;
                        commit('storeAuthData', response);
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
        },
        logout(context) {
            if (context.getters.isLogged) {
                context.commit('logout')
            }
        }
    }
});
export default store

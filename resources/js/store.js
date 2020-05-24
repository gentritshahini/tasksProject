import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        access_token: localStorage.getItem('access_token') || null,
        is_logged: localStorage.getItem('access_token') != null,
        user: localStorage.getItem('user') || null,
        tasks: []
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
        },
        tasks(state) {
            return state.tasks.reverse();
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
        },
        storeTask(state, data) {
            state.tasks.push(data)
        },
        deleteTaskById(state, id) {
            const task = state.tasks.find((task) => task.id === id)
            const index = state.tasks.indexOf(task);
            state.tasks.splice(index, 1);
        },
        updateTaskById(state, data) {
            const task = state.tasks.find((task) => task.id === data.id)
            if (data.title) {
                task.title = data.title
            }
            if (data.description) {
                task.description = data.description
            }
            if (data.finished) {
                task.finished = data.finished
            }
        },
        createCommentforTask(state, data) {
            const task = state.tasks.find((task) => task.id === data.task_id)
            task.comments.push(data)
        },
        deleteCommentofTask(state, data) {
            const task = state.tasks.find((item) => item.id === data.task_id);
            const index = task.comments.findIndex((comment) => comment.id === data.id)
            task.comments.splice(index, 1)
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
        },
        createNewTask({commit}) {
            axios.post('/task/create')
                .then((res) => {
                    let response = res.data.data;
                    commit('storeTask', response);
                })
        },
        getAllTasks({commit}) {
            axios.get('/tasks/all')
                .then((res) => {
                    let response = res.data.data;
                    response.forEach((res) => {
                        commit('storeTask', res);
                    })
                })
        },
        deleteTask({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('/task/delete', data)
                    .then((res) => {
                        commit('deleteTaskById', data.id)
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
        },
        updateTaskTitle({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('/task/update', {
                    'id': data.id,
                    'title': data.title
                })
                    .then((res) => {
                        commit('updateTaskById', res.data.data)
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
        },
        updateTaskDescription({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('/task/update', {
                    'id': data.id,
                    'description': data.description
                })
                    .then((res) => {
                        commit('updateTaskById', res.data.data)
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
        },
        updateTaskFinished({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('/task/update', {
                    'id': data.id,
                    'finished': data.finished
                })
                    .then((res) => {
                        commit('updateTaskById', res.data.data)
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
        },
        createComment({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('/comment/create', {
                    'task_id': data.id,
                    'comment': data.comment
                })
                    .then((res) => {
                        commit('createCommentforTask', res.data.data)
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
        },
        deleteComment({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('/comment/delete', {
                    'id': data.id
                })
                    .then((res) => {
                        commit('deleteCommentofTask', data)
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
        }
    }
});
export default store

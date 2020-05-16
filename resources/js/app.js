require('./bootstrap');
window.Vue = require('vue');

import App from './components/App';
import router from './router';
import store from './store';
import axios from 'axios';
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
});

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

let newVue = new Vue({});

axios.interceptors.request.use(function (config) {
        newVue.$Progress.start();
        const token = localStorage.getItem('access_token');
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(function (response) {
    newVue.$Progress.finish();
    return response;
}, function (error) {
    newVue.$Progress.fail();
    switch (error.response.status) {
        case 401:{
            store.dispatch('logout');
            router.push('/login');
            break;
        }
        case 403:{
            router.push('/login');
            break;
        }
        case 404: {
            router.push('/')
        }
    }
    return Promise.reject(error.response);
});

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created:function () {
        let access_token = store.state.access_token;
    }
});

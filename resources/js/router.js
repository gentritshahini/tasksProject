import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import home from './components/pages/home/index';
import login from './components/pages/auth/login';
import logout from './components/pages/auth/logout';
import register from './components/pages/auth/register';


Vue.use(Router);

const routes = [
    { path: '/login',                    component: login,                    name: 'login',     },
    { path: '/register',                 component: register,                 name: 'register',  },
    { path: '/',                         component: home,                     name: 'home',                     meta: { requiresAuth: true }},
    { path: '/logout',                   component: logout,                   name: 'logout',                   meta: { requiresAuth: true }}
];

const router = new Router({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    let auth_routes = ['login','register'];
    let is_logged   = store.getters.isLogged ?? false;

    if(is_logged && auth_routes.includes(to.name)){
       next('/');
       return;
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {

        if (is_logged) {
            next();
            return false;
        } else {
            next('/login');
            return false;
        }

    } else {
        next();
        return false;
    }
});

export default router;

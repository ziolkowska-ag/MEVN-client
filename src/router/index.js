import Vue from 'vue';
import VueRouter from 'vue-router';
import trips from '../components/trips';
import singleTrip from '../components/singleTrip';
import singlePost from '../components/singlePost';
import blog from '../components/blog';
import newTrip from "../components/newTrip";
import login from "../components/login";
import register from "../components/register";
import newPost from "../components/newPost";
import home from "../components/home";
import intro from "../components/intro";
import Vuex from "vuex";
import pageNotFound from "../components/pageNotFound";

Vue.use(VueRouter);
Vue.use(Vuex);
export const store = new Vuex.Store(
    {
        state: {
            authenticated: false,
            accessToken:  localStorage.getItem('usertoken'),

        },
        mutations: {
            setAuthentication(state, status) {
                state.authenticated = status;
            }
        }
    }
);

export const requireAuth = (to, from, next) => {

    if (store.state.authenticated || store.state.accessToken !== null) {
        next();
    } else {
        next('/login');
    }
};

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '*',
            component: pageNotFound,
        },
        {
            path: '/',
            name: 'intro',
            component: intro
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            beforeEnter: requireAuth,

        },
        {
            path: '/trips',
            name: 'trips',
            component: trips,
            beforeEnter: requireAuth,
        },
        {
            path: '/singleTrip/:Pid',
            name: 'singleTrip',
            component: singleTrip,
            beforeEnter: requireAuth
        },
        {
            path: '/singlePost/:Pid',
            name: 'singlePost',
            component: singlePost,
            beforeEnter: requireAuth,
        },
        {
            path: '/blog',
            name: 'blog',
            component: blog,
            beforeEnter: requireAuth,
        },
        {
            path: '/addTrip',
            name: 'addTrip',
            component: newTrip,
            beforeEnter: requireAuth,
        },
        {
            path: '/addPost',
            name: 'addPost',
            component: newPost,
            beforeEnter: requireAuth,
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        }
    ],
    scrollBehavior() {
        document.getElementById('app').scrollIntoView();
    }
});

export default router;

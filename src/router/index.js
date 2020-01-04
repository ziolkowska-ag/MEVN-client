import Vue from 'vue';
import VueRouter from 'vue-router';
import trips from '../components/trips';
import single_trip from '../components/single_trip';
import blog from '../components/blog';
import new_trip from "../components/new_trip";
import login from "../components/login";
import register from "../components/register";
import new_post from "../components/new_post";

Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'unlogged',
            component: login
        },
        {
            path: '/trips',
            name: 'trips',
            component: trips
        },
        {
            path: '/singleTrip',
            name: 'single_trip',
            component: single_trip
        },
        {
            path: '/blog',
            name: 'blog',
            component: blog
        },
        {
            path: '/addTrip',
            name: 'addTrip',
            component: new_trip
        },
        {
            path: '/addPost',
            name: 'addPost',
            component: new_post
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

    ]
});

export default router;

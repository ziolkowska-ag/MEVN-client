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
            path: '/singleTrip/:Pid',
            name: 'singleTrip',
            component: singleTrip
        },
        {
            path: '/singlePost',
            name: 'singlePost',
            component: singlePost
        },
        {
            path: '/blog',
            name: 'blog',
            component: blog
        },
        {
            path: '/addTrip',
            name: 'addTrip',
            component: newTrip
        },
        {
            path: '/addPost',
            name: 'addPost',
            component: newPost
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

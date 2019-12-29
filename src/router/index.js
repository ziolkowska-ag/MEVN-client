import Vue from 'vue';
import VueRouter from 'vue-router';
import trips from '../components/trips';
import single_trip from '../components/single_trip';
import blog from '../components/blog';
import new_trip from "../components/new_trip";

Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '',
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
            path: '/add',
            name: 'add',
            component: new_trip
        },

    ]
});

export default router;

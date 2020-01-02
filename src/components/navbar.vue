<template>
    <nav class="navbar navbar-expand-lg navbar-light rounded">
        <button class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar1"
                aria-controls="navbar1"
                aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"/>
        </button>
        <div class="collapse navbar-collapse justify-content-md-center" id="navbar1">
            <ul class="navbar-nav">
                <li v-if="auth ==='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/trips">Home</router-link>
                </li>
                <li v-if="auth !== 'loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li v-if="auth !== 'loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/register">Register</router-link>
                </li>
                <li v-if="auth ==='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/blog">Blog</router-link>
                </li>
                <li v-if="auth ==='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/add">Add trip</router-link>
                </li>
                <li v-if="auth ==='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/trips">Trips</router-link>
                </li>
                <li v-if="auth ==='loggedin'" class="nav-item">
                    <a href="" class="nav-link" v-on:click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import eventBus from './eventBus'
    import router from "../router";

    export default {
        data() {
            return {
                auth: '',
                user: ''
            }
        },
        methods: {
            logout() {
                localStorage.removeItem('usertoken');
                router.push({name: 'login'})
            }
        },
        mounted() {
            eventBus.$on('logged-in', status => {
                this.auth = status;
            })
        }
    }
</script>

<style scope>
    .navbar {
        background-color: #8dd6d0;
    }
</style>

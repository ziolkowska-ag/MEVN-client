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
                    <router-link class="nav-link" to="/home">HOME</router-link>
                </li>
                <li v-if="auth !== 'loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/login">LOGIN</router-link>
                </li>
                <li v-if="auth !== 'loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/register">REGISTER</router-link>
                </li>
                <li v-if="auth ==='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/blog">BLOG</router-link>
                </li>
                <li v-if="auth ==='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/addTrip">ADD TRIP</router-link>
                </li>
                <li v-if="auth ==='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/trips">TRIPS</router-link>
                </li>
                <li v-if="auth ==='loggedin'" class="nav-item">
                    <a href="" class="nav-link" v-on:click="logout">LOGOUT</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import eventBus from './eventBus'
    import router, {store} from "../router";

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
                localStorage.removeItem('username');
                store.commit("setAuthentication", false);
                router.push({path: '/'})
            }
        },
        created() {
            eventBus.$on('logged-in', status => {
                this.auth = status;
            });
            if(store.state.accessToken !== null) {
                eventBus.$emit('logged-in', 'loggedin');
            }
        }
    }
</script>

<style>
    .navbar {
        background-color: #8dd6d0;
        font-size: 20px;
    }

    ul > li {
        margin: 0 15px;
    }

    ul > li:hover {
        color: #2c3e50;
        font-weight: bolder;
    }
</style>

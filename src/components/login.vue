<template>
    <div class="container">
        <div class="col-md-6 mt-5 mx-auto">
            <form v-on:submit.prevent="login">
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" v-model="username" id="username" class="form-control"
                           placeholder="Enter your username">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" v-model="password" id="password" class="form-control"
                           placeholder="Enter your password">
                </div>
                <button class="btn-lg btn-block">Sign In</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import router from '../router';
    import eventBus from "./eventBus";

    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                axios.post('http://localhost:5000/api/users/login', {
                    username: this.username,
                    password: this.password
                }).then(res => {
                    // eslint-disable-next-line no-console
                    console.log('hello from login: ', res.status);
                    localStorage.setItem('usertoken', res.data);
                    this.emitMethod();

                    this.username = '';
                    this.password = '';
                }).catch();
            },
            emitMethod() {
                eventBus.$emit('logged-in', 'loggedin');
                router.push({name: 'trips'});
            }
        }
    }

</script>

<style scoped>
    button {
        background-color: #8dd6d0;
    }
</style>

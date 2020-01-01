<template>
    <div class="container">
        <div class="col-md-6 mt-5 mx-auto">
            <form v-on:submit.prevent="register">
                <h1 class="h3 mb-3 font-weight normal">Register</h1>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" v-model="email" class="form-control" placeholder="Enter your email" id="email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" v-model="password" class="form-control" placeholder="Enter your password" id="password">
                </div>
                <button class="btn-lg btn-primary btn-block" type="submit">Register</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import router from "../router";

    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            register() {
                axios.post('http://localhost:5000/api/users/register', {
                    email: this.email,
                    password: this.password
                }).then(() => {
                    router.push({name: 'login'});
                }).catch();
            }
        }
    }
</script>

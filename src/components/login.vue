<template>
    <div class="container">
        <div class="col-md-6 mt-5 mx-auto">
            <form v-on:submit.prevent="login">
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" v-model="email" id="email" class="form-control"
                           placeholder="Enter your email address">
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
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                axios.post('http://localhost:5000/api/users/login', {
                    email: this.email,
                    password: this.password
                }).then(res => {
                    localStorage.setItem('usertoken', res.data);
                    this.email = '';
                    this.password = '';
                }).catch();
                this.emitMethod();
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

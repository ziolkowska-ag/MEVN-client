<template>
    <div class="container">
        <div class="col-md-6 mt-5 mx-auto">
            <form v-on:submit.prevent="login">
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input required type="text" v-model="username" id="username" class="form-control"
                           placeholder="Enter your username" v-bind:class="{ error: isInvalid }">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input required type="password" v-model="password" id="password" class="form-control"
                           placeholder="Enter your password" v-bind:class="{ error: isInvalid }">
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
    import Swal from 'sweetalert2';

    export default {
        data() {
            return {
                username: '',
                password: '',
                isInvalid: false,
                errorMsg: '',
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
                    this.isInvalid = false;

                }).catch((err) => {
                    this.isInvalid = true;
                    Swal.fire({
                        title: 'Ooops!',
                        text: err.response.data.error,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                });
            },
            emitMethod() {
                eventBus.$emit('logged-in', 'loggedin');
                router.push({name: 'home'});
            },
        }
    }

</script>

<style scoped>
    button {
        background-color: #8dd6d0;
    }

    .error {
        border: 1px solid red;
    }
</style>

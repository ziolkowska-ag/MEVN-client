<template>
    <div class="container">
        <img id="icon" src="../../public/assets/favicon.png" alt="Globe traveller" height="200" width="200"
             @click="goTo('intro')">
        <div class="col-md-6 mt-5 mx-auto">
            <form @submit.prevent="login">
                <h1 class="login h2 mb-3 font-weight-normal">Please sign in</h1>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input required type="text" v-model="username" id="username" class="form-control"
                           placeholder="Enter your username">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input required type="password" v-model="password" id="password" class="form-control"
                           placeholder="Enter your password">
                </div>
                <button class="btn-lg btn-block">Sign In</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import router, {store} from '../router';
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
                    localStorage.setItem('usertoken', res.data);
                    localStorage.setItem('username', this.username);
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
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#8dd6d0',
                    })
                });
            },
            emitMethod() {
                eventBus.$emit('logged-in', 'loggedin');
                store.commit("setAuthentication", true);
                router.push({name: 'home'});
            },
            goTo(whereTo) {
                router.push({name: whereTo});
            }
        }
    }

</script>

<style scoped>
    button {
        background-color: #8dd6d0;
    }

    #icon {
        margin-top: 20px;
        cursor: pointer;
    }

    div > label {
        font-weight: 700;
    }

    .form-group {
        padding-top: 10px;
    }

    .login {
        text-decoration: underline;
    }
</style>

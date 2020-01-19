<template>
    <div class="container">
        <img id="icon" src="../../public/assets/favicon.png" alt="Globe traveller" height="200" width="200"
             @click="goTo('intro')">
        <div class="col-md-6 mt-5 mx-auto">
            <!-- the submit event will no longer reload the page -->
            <!--            equivalent of putting e.preventDefault() in the handleSubmit method-->
            <form @submit.prevent="handleSubmit">
                <h1 class="register h2 mb-3 font-weight-normal">Register</h1>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text"
                           v-model="username"
                           placeholder="Enter your username"
                           id="username"
                           class="form-control"
                           :class="{ 'is-invalid': submitted && $v.username.$error }"
                    >
                    <div v-if="submitted && !$v.username.required" class="invalid-feedback">Username is required</div>
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email"
                           v-model="email"
                           class="form-control"
                           :class="{ 'is-invalid': submitted && $v.email.$error }"
                           placeholder="Enter your email"
                           id="email">
                    <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                        <span v-if="!$v.email.required">Email is required</span>
                        <span v-if="!$v.email.email">Email is invalid</span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password"
                           v-model="password"
                           class="form-control"
                           :class="{ 'is-invalid': submitted && $v.password.$error }"
                           placeholder="Enter your password"
                           id="password">
                    <div v-if="submitted && $v.password.$error" class="invalid-feedback">
                        <span v-if="!$v.password.required">Password is required</span>
                        <span v-if="!$v.password.minLength">Password must be at least 6 characters</span>
                    </div>
                </div>
                <button class="btn-lg btn-block">Register</button>
            </form>
            <div v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors"
                        v-bind:key="error.id"
                    >
                        {{ error }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import router from "../router";
    import {required, email, minLength} from "vuelidate/lib/validators";


    export default {
        data() {
            return {
                username: '',
                email: '',
                password: '',
                errors: [],
                submitted: false,
            }
        },
        validations: {
            username: {required},
            email: {required, email},
            password: {required, minLength: minLength(6)},
        },
        methods: {
            handleSubmit() {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                axios.post('http://localhost:5000/api/users/register', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }).then(() => {
                    router.push({name: 'login'});
                }).catch();
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
        margin-bottom: 10px;
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

    .register {
        text-decoration: underline;
    }
</style>

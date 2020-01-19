<template>
    <div class="container">
        <img id="notFound" src="../../public/assets/404.png" alt="404 not found" height="300" width="300">
        <p id="lost">Looks like you're lost..</p>
        <button class="btn" @click="goTo('home')">Go home</button>
    </div>
</template>

<script>

    import router from "../router";

    export default {
        name: 'new_trip',
        data() {
            return {
                title: "Page not found"
            }
        },
        methods: {
            goTo(whereTo) {
                router.push({name: whereTo});
            },
        }
    }
</script>

<style>
    #notFound {
        margin-top: 25px;
    }

    #lost {
        padding: 10px;
        font-size: 28px;
    }

    .btn {
        width: 30%;
        background-color: #8dd6d0 !important;
    }
</style>

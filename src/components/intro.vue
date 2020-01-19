<template>
    <div class="container">
        <img id="logo" class="icon" src="../../public/assets/favicon.png" alt="Globe traveller" height="300" width="300">
        <p id="pageTitle">{{name}}</p>
        <div class="btns">
            <button class="btn-lg btn-block" @click="goTo('register')">Get started!</button>
            <button class="btn-lg btn-block" @click="goTo('login')">Log in!</button>
        </div>
        <footer id="footer">
            @Traveljournal 2020 by Agnieszka Ziolkowska and Jakub Górka
        </footer>
    </div>
</template>

<script>

    import router from "../router";

    export default {
        data() {
            return {
                name: 'Traveljournal',
            }
        },
        methods: {
            goTo(whereTo) {
                router.push({name: whereTo});
            }
        }

    }
</script>

<style>

    @media (max-width: 430px) {
        #logo {
            width: 200px;
            height: 200px;
        }

        #pageTitle {
            font-size: 2em !important;
        }

        #footer {
            font-size: 9px;
        }
    }

    #pageTitle {
        color: #8dd6d0;
        font-weight: bold;
        font-size: 4em;
        padding: 20px;
        text-decoration: underline #2c3e50;
    }

    #logo {
        margin: 20px 0;
    }

    .btns {
        width: 50%;
        margin: 0 auto;
    }

    .btns > button {
        background-color: #8dd6d0;
        color: #2c3e50;
        font-weight: 500;
    }

    #footer {
        padding-top: 5%;
    }
</style>

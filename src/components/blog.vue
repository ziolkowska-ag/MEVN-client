<template>
    <div class="blog">
        <h1>{{title}}</h1>
        <button v-on:click="goTo('/')">Go home!</button>
    </div>
</template>

<script>
    import router from "../router";

    export default {
        name: 'blog',
        data() {
            return {title: 'Blog'}
        },
        methods: {
            goTo(location) {
                router.push(location);
            }
        }
    }
</script>


<style scoped></style>

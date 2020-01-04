<template>
    <div class="container">
        <h1>Latest trips:</h1>
        'this is id from params: '{{this.$route.params.Pid}}
        <br>
        'this is id from object: '{{post._id}}
        <br>
        <p>hello from title: {{post.title}}</p>
        <p>heellllo from tex: {{post.text}}</p>
        <p>Hello from date: {{post.date}}</p>

    </div>
</template>

<script>
    import PostService from "../PostService";

    export default {
        name: 'singlePost',
        data() {
            return {
                msg: "Hello world!",
                title: "hjihi",
                post: {},
            }
        },
        async created() {
            try {
                this.post = await PostService.getPost(this.$route.params.Pid);
            } catch (error) {
                this.error = error.message;
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.container {
        max-width: 800px;
        margin: auto;
    }
</style>

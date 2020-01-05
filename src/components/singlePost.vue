<template>
    <div class="container">
        <h1>{{post.title}}</h1>
        <p class="date">{{`${postDate.getDate()}/${postDate.getMonth()+1}/${postDate.getFullYear()}`}}</p>
        <p class="text">{{post.text}}</p>
    </div>
</template>

<script>
    import PostService from "../PostService";

    export default {
        name: 'singlePost',
        data() {
            return {
                post: {},
                postDate: '',
            }
        },
        async created() {
            try {
                this.post = await PostService.getPost(this.$route.params.Pid);
                this.postDate = new Date(this.post.date);
            } catch (error) {
                this.error = error.message;
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.container {
        max-width: 700px;
        border: 1px solid #4a6b63;
        border-radius: 5px;
        box-shadow: 0 0 1em #4a6b63;
        background-color: #8dd6d0;
        margin: 15px auto;
        padding-top: 10px;
    }
    h1 {
        color: #2c3e50;
        font-weight: bold;
        font-size: 55px;
    }
    .date {
        font-size: 20px;
        color: white;
    }
    .text {
        font-size: 25px;
    }
</style>

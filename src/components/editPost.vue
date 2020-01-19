<template>
    <form class="edit-post">
        <h1 id="title">{{title}}</h1>
        <ul class="container">
            <li class="form-row">
                <label for="name">Title:</label>
                <input type="text" id="name" v-model="post.title">
            </li>
            <li class="form-row">
                <label for="content">Content:</label>
                <textarea id="content" v-model="post.text"/>
            </li>
            <li class="form-row">
                <button v-on:click="editPost">Save changes!</button>
            </li>
        </ul>
    </form>
</template>

<script>
    import PostService from "../PostService";
    import router from "../router";

    export default {
        name: 'edit_post',
        data() {
            return {
                title: 'Edit post',
                post: '',
                error: '',
                username: '',
                user_id: '',
            }
        },
        methods: {
            editPost() {
                PostService.updatePost(this.user_id, this.post._id, this.user_id, this.post.title, this.post.text);
                router.push({name: 'blog'});
            }
        },
        async created() {
            this.username = localStorage.getItem("username");
            PostService.getUserId(this.username).then(res => {
                this.user_id = res.id;
                PostService.getPost(this.user_id, this.$route.params.Pid).then(post => {
                    this.post = post;
                });

            });

        }
    }
</script>

<style scoped>
    #title {
        color: #8dd6d0;
        font-weight: bold;
        font-size: 57px;
        text-decoration: underline #2c3e50;
        padding-bottom: 5px;
    }

    .edit-post {
        padding-top: 2em;
    }

    .container {
        background-color: #8dd6d0;
        padding: 1.8em;
        border: 1px solid #4a6b63;
        border-radius: 5px;
        box-shadow: 0 0 1em #4a6b63;
        max-width: 900px;
        margin: 10px auto;
    }

    .form-row {
        display: flex;
        justify-content: center;
        padding: .5em;
    }

    @media (max-width: 600px) {
        .form-row {
            flex-direction: column;
        }
    }

    .form-row > label {
        padding: .5em .5em .5em 0;
        flex: 1;
        font-weight: bold;
        color: #4a6b63;
        font-size: 20px;
    }

    .form-row > input, textarea {
        flex: 5;
        padding: .5em;
        border: 1px solid #4a6b63;
        border-radius: 10px;
        font-size: 14px;
    }

    textarea {
        height: 20vh;
    }

    .form-row > button {
        background-color: #4a6b63;
        color: white;
        margin-top: 25px;
        font-weight: bold;
        font-size: 14px;
        border: 1px solid #4a6b63;
        border-radius: 5px;
        width: 30%;
    }
</style>

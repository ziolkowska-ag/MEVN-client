<template>
    <form class="create-post">
        <ul class="container">
            <li class="form-row">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" placeholder="Name your post..">
            </li>
            <li class="form-row">
                <label for="content">Content:</label>
                <textarea id="content" v-model="content" placeholder="Say something.."/>
            </li>
            <li class="form-row">
                <button v-on:click="createPost">Create!</button>
            </li>
        </ul>
    </form>
</template>

<script>
    import router from "../router";
    import PostService from "../PostService";

    export default {
        name: 'new_trip',
        data() {
            return {
                error: '',
                name: '',
                content: '',
                user_id: '',
                username: '',
            }
        },
        methods: {
            createPost() {
                PostService.createPost(this.name, this.content, new Date(), this.user_id);
                router.push({name: 'blog'})
            }
        },
        created() {
            this.username = localStorage.getItem("username");
            PostService.getUserId(this.username).then(res => {
                this.user_id = res.id;
            });
        }
    }
</script>

<style scoped>
    .create-post {
        padding-top: 2em;
    }

    .container {
        background-color: #8dd6d0;
        padding: 1.8em;
        border: 1px solid #4a6b63;
        border-radius: 5px;
        box-shadow: 0 0 1em #4a6b63;
        max-width: 900px;
        margin: 0 auto;
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

    textarea {
        height: 20vh;
    }
</style>

<template>
    <div class="container">
        <div class="post-container">
            <h1 id="postTitle">
                {{post.title}}
                <img id="edit" src="../../public/assets/edit.png" width="35" height="35" @click="goTo(`/editPost/${post._id}`)">
            </h1>
            <p class="text">{{post.text}}</p>
        </div>
    </div>
</template>

<script>
    import PostService from "../PostService";
    import router from "../router";

    export default {
        name: 'singlePost',
        data() {
            return {
                post: {},
                day: '',
                month: '',
                year: '',
                username: '',
                user_id: '',
            }
        },
        methods: {
            goTo(location) {
                router.push(location);
            }
        },
        async created() {
            try {
                this.username = localStorage.getItem("username");
                await PostService.getUserId(this.username).then(res => {
                    this.user_id = res.id;
                });
                this.post = await PostService.getPost(this.user_id, this.$route.params.Pid);
                this.day = new Date(this.trip.date).getDate();
                this.month = new Date(this.trip.date).getMonth();
                this.year = new Date(this.trip.date).getFullYear();
            } catch (error) {
                this.error = error.message;
            }
        },
    }
</script>

<style scoped>
    div.post-container {
        max-width: 700px;
        border: 1px solid #4a6b63;
        border-radius: 5px;
        box-shadow: 0 0 1em #4a6b63;
        background-color: #8dd6d0;
        margin: 15px auto;
        padding: 20px;
    }

    #postTitle {
        color: #2c3e50;
        font-weight: bold;
        font-size: 35px;
        margin-bottom: 30px;
    }

    .text {
        font-size: 18px;
    }

    #edit {
        cursor: pointer;
        padding: 10px;
    }
</style>

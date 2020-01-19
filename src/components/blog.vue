<template>
    <div class="blog">
        <h1 id="title">{{title}}</h1>
        <div class="new-post">
            <router-link class="new-post-btn" to="/addPost">Add New Post</router-link>
        </div>
        <div class="search-post">
            <label for="search-post">SEARCH..</label>
            <input type="search" v-on:keyup="searchPost" v-model="searchWord" id="search-post">
        </div>
        <hr>
        <div class="noPosts" v-if="postsCopy.length <= 0">
            <p>You currently don't have any posts written in your blog.</p>
            <p>Change that by adding your first <a style="cursor: pointer; font-weight: bolder; color:#8dd6d0; font-size: larger" @click="goTo('addPost')">POST</a></p>
        </div>
        <p class="error" v-if="error">{{error}}</p>
        <div class="posts-container" v-for="(post, index) in postsCopy"
             v-bind:item="post"
             v-bind:key="post._id"
             v-bind:index="index">
            <p class="date">{{`${new Date(post.date).getDate()}/${new Date(post.date).getMonth()+1}/${new
                Date(post.date).getFullYear()}`}}</p>
            <p class="name">{{post.title}}</p>
            <p class="text">{{`${post.text.slice(0, 30)} ...`}}</p>
            <p class="read-more" @click="goToSinglePost(post._id)">Read more</p>
            <button class="delete" @click="deletePost(post._id)">x</button>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    import PostService from "../PostService";


    export default {
        name: 'blog',
        data() {
            return {
                title: 'Blog',
                posts: [],
                postsCopy: [],
                searchWord: '',
                error: '',
                username: '',
                user_id: '',
            }
        },
        async created() {
            try {
                this.username = localStorage.getItem("username");
                await PostService.getUserId(this.username).then(res => {
                    this.user_id = res.id;
                });
                this.posts = await PostService.getPosts(this.user_id);
                this.postsCopy = this.posts;

            } catch (error) {
                this.error = error.message;
            }
        },
        methods: {
            searchPost() {
                this.postsCopy = this.posts.filter((post) => {
                    return post.title.toLowerCase().includes(this.searchWord.toLowerCase())
                });
            },
            async deletePost(id) {
                await PostService.deletePost(id);
                this.username = localStorage.getItem("username");
                await PostService.getUserId(this.username).then(res => {
                    this.user_id = res.id;
                });
                this.posts = await PostService.getPosts(this.user_id);
                this.postsCopy = this.posts;
            },
            goToSinglePost(id) {
                router.push({name: 'singlePost', params: {Pid: id}});
            },
            goTo(location) {
                router.push(location);
            },
        }
    }
</script>


<style scoped>
    .new-post {
        margin: 30px 0;
    }

    .new-post-btn {
        background-color: #2c3e50;
        color: whitesmoke;
        font-weight: bold;
        font-size: 14px;
        border: 1px solid #4a6b63;
        border-radius: 5px;
        width: 30%;
        padding: 5px;
        text-decoration: none;
    }

    .read-more {
        color: #2c3e50;
        cursor: pointer;
        text-decoration: none;
        font-weight: 900;
    }

    .blog {
        padding-top: 5rem;
    }

    #title {
        color: #8dd6d0;
        font-weight: bold;
        font-size: 55px;
        text-decoration: underline #2c3e50;
    }

    .search-post {
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .search-post > input {
        width: 25%;
        border: 1px solid #4a6b63;
        border-radius: 5px;
    }

    p.error {
        border: 1px solid #ff5b5f;
        background-color: #ffc5c1;
        padding: 10px;
        margin-bottom: 15px;
    }

    .posts-container {
        max-width: 700px;
        border: 1px solid #4a6b63;
        border-radius: 5px;
        box-shadow: 0 0 1em #4a6b63;
        background-color: #8dd6d0;
        margin: 15px auto;
        padding-top: 10px;
    }

    p.name {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 0;
        cursor: pointer;
        color: whitesmoke;
    }

    p.text {
        padding: 15px;
    }

    p.date {
        font-weight: 700;
    }

    .delete {
        background-color: #e3063b;
        color: white;
        font-weight: 900;
        border: 1px solid #e3063b;
        border-radius: 5px;
        margin-bottom: 20px;
        margin-left: 90%;
    }
</style>

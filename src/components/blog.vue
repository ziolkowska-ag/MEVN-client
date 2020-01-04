<template>
    <div class="blog">
        <h1>{{title}}</h1>
        <div class="new-post">
            <router-link class="new-post-btn" to="/addPost">Add New Post</router-link>
        </div>
        <div class="search-post">
            <label for="search-post">SEARCH..</label>
            <input type="search" v-on:keyup="searchPost" v-model="searchWord" id="search-post">
        </div>
        <hr>
        <p class="error" v-if="error">{{error}}</p>
        <div class="posts-container" v-for="(post, index) in postsCopy"
             v-bind:item="post"
             v-bind:key="post._id"
             v-bind:index="index">
            <p class="date">{{`${post.date.getDate()}/${post.date.getMonth()+1}/${post.date.getFullYear()}`}}</p>
            <p class="name">{{post.name}}</p>
            <p class="text">{{post.text}}</p>
            <p class="delete" v-on:dblclick="deletePost(post._id)">x</p>
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
                posts: [
                    {
                        date: new Date(),
                        name: "dupa",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
                            " ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation " +
                            "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in " +
                            "reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
                            "sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id " +
                            "est laborum.",
                    },
                    {
                        date: new Date(),
                        name: "dupa",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
                            " ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation " +
                            "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in " +
                            "reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
                            "sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id " +
                            "est laborum.",
                    },
                    {
                        date: new Date(),
                        name: "dupa",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
                            " ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation " +
                            "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in " +
                            "reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
                            "sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id " +
                            "est laborum.",
                    }
                ],
                postsCopy: [],
                searchWord: '',
                error: '',
            }
        },
        async created() {
            try {
                //this.posts = await PostService.getPosts();
                this.postsCopy = this.posts;

            } catch (error) {
                this.error = error.message;
            }
        },
        async updated() {
            try {
                //this.posts = await PostService.getPosts();
                this.postsCopy = this.posts;

            } catch (error) {
                this.error = error.message;
            }
        },
        methods: {
            searchPost() {
                this.postsCopy = this.posts.filter((post) => {
                    return post.name.toLowerCase().includes(this.searchWord.toLowerCase())
                });
            },
            async deletePost(id) {
                await PostService.deletePost(id);
                //this.posts = await PostService.getPosts();
            },
            goTo(location) {
                router.push(location);
            }
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

    .blog {
        padding-top: 5rem;
    }

    .posts-container {
        max-width: 700px;
        margin: auto;
    }

    h1 {
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
        border: 1px solid #4a6b63;
        border-radius: 5px;
        box-shadow: 0 0 1em #4a6b63;
        background-color: #8dd6d0;
        margin-bottom: 15px;
        padding-top: 10px;
    }

    h3 {
        color: #4a6b63;
    }

    p.name {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 0;
        cursor: pointer;
        color: whitesmoke;
    }

    p.text {
        padding: 0 5px;
    }

    p.date {
        font-weight: 700;
    }

    p.delete {
        background-color: #2c3e50;
        color: white;
        font-weight: 900;
        font-size: 25px;
        border: 1px solid #4a6b63;
        border-radius: 5px;
        width: 40px;
        height: 40px;
        margin: 10px auto;
        text-align: center;
        vertical-align: middle;
    }
</style>

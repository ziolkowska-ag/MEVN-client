<template>
    <div class="blog">
        <h1>{{title}}</h1>
        <div class="search-post">
            <label for="search-post">SEARCH..</label>
            <input type="search" v-on:keyup="searchPost" v-model="searchWord" id="search-post">
        </div>
        <hr>
        <p class="error" v-if="error">{{error}}</p>
        <div class="posts-container">
            <carousel :perPage="1"
                      :autoplay="true"
                      :speed="1000"
                      pagination-active-color="#4a6b63">
                <slide v-for="(post, index) in postsCopy"
                       v-bind:item="post"
                       v-bind:key="post._id"
                       v-bind:index="index"
                >
                    <div class="slide-content">
                        <p>{{`${post.date.getDate()}/${post.date.getMonth()+1}/${post.date.getFullYear()}`}}</p>
                        <p class="name">{{post.name}}</p>
                        <p class="text">{{post.text}}</p>
                        <p class="delete" v-on:dblclick="deletePost(post._id)">x</p>
                    </div>
                </slide>
            </carousel>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    import {Carousel, Slide} from 'vue-carousel';
    import PostService from "../PostService";


    export default {
        name: 'blog',
        components: {
            Carousel,
            Slide
        },
        data() {
            return {
                title: 'Blog',
                posts: [
                    {
                        date: new Date(),
                        name: "dupa",
                        text: "z trupa"
                    },
                    {
                        date: new Date(),
                        name: "dupa",
                        text: "z trupa"
                    },
                    {
                        date: new Date(),
                        name: "dupa",
                        text: "z trupa"
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

    .slide-content {
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

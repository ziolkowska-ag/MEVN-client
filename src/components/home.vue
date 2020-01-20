<template>
    <div class="container">
        <img id="icon" src="../../public/assets/favicon.png" alt="Globe traveller" height="200" width="200">
        <h1 id="title">{{title}}</h1>
        <hr>
        <p class="error" v-if="error">{{error}}</p>
        <h4 class="subtitle">{{subtitle1}}</h4>
        <div class="noTrips" v-if="tripsCopy.length <= 0">
            <p>You currently don't have any trips in your journal.</p>
            <p>Change that by adding your first <a style="cursor: pointer; font-weight: bolder; color:#8dd6d0; font-size: larger" @click="goTo('addTrip')">TRIP</a></p>
        </div>
        <div class="trips-container">
            <carousel :perPage="1"
                      :autoplay="true"
                      :loop="true"
                      :speed="1500"
                      pagination-active-color="#2c3e50">
                <slide v-for="(trip, index) in tripsCopy"
                       v-bind:item="trip"
                       v-bind:key="trip._id"
                       v-bind:index="index"
                >
                    <div class="slide-content">
                        <p class="date">{{`Leaving on: ${new Date(trip.start_date).getDate()}/${new Date(trip.start_date).getMonth()+1}/${new
                            Date(trip.start_date).getFullYear()}`}}</p>
                        <p class="name" @click="goTo(`singleTrip/${trip._id}`)">{{trip.name.toUpperCase()}}</p>
                    </div>
                </slide>
            </carousel>
        </div>
        <hr>
        <h4 class="subtitle">{{subtitle2}}</h4>
        <div class="posts-container">
            <carousel :perPage="1"
                      :autoplay="true"
                      :loop="true"
                      :speed="1500"
                      pagination-active-color="#2c3e50">
                <slide v-for="(post, index) in postsCopy"
                       v-bind:item="post"
                       v-bind:key="post._id"
                       v-bind:index="index"
                >
                    <div class="slide-content">
                       <p class="postTitle" @click="goTo(`singlePost/${post._id}`)">{{post.title.toUpperCase()}}</p>
                    </div>
                </slide>
            </carousel>
        </div>
        <hr>
    </div>
</template>

<script>
    import TripService from "../TripService";
    import {Carousel, Slide} from 'vue-carousel';
    import router from "../router";
    import PostService from "../PostService";

    export default {
        name: 'trips',
        components: {
            Carousel,
            Slide
        },
        data() {
            return {
                title: 'Travel journal',
                subtitle1: 'Trips coming up this month:',
                subtitle2: 'Blog posts added this month:',
                trips: [],
                posts: [],
                tripsCopy: [],
                postsCopy: [],
                error: '',
                username: '',
                user_id: '',
            }
        },
        async created() {
            try {
                this.username = localStorage.getItem("username");
                await TripService.getUserId(this.username).then(res => {
                    this.user_id = res.id;
                });
                this.trips = await TripService.getTrips(this.user_id);
                this.posts = await PostService.getPosts(this.user_id);
                this.tripsCopy = this.trips.filter(trip => new Date(trip.start_date).getMonth() === new Date().getMonth())
                    .sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
                this.postsCopy = this.posts.filter(post => new Date(post.date).getMonth() === new Date().getMonth())
                    .sort((a, b) => {
                        return new Date(a.date) - new Date(b.date);
                    });
            } catch (error) {
                this.error = error.message;
            }
        },
        methods: {
            goTo(location) {
                router.push(location);
            }
        },
    }
</script>

<style scoped>

    .container {
        padding-top: 2rem;
    }

    .trips-container, .posts-container {
        max-width: 700px;
        margin: 10px auto;
    }

    .postTitle {
        padding-top: 15px;
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 0;
        cursor: pointer;
        color: whitesmoke;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
    }

    #title {
        color: #8dd6d0;
        font-weight: bold;
        font-size: 77px;
        text-decoration: underline #2c3e50;
    }

    .search-trip > input {
        width: 35%;
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
        position: relative;
        border: 1px solid #4a6b63;
        border-radius: 5px;
        box-shadow: 0 0 1em #4a6b63;
        background-color: #8dd6d0;
        margin: 15px 0 0 0;
        height: 20vh;
    }

    .subtitle {
        color: #2c3e50;
        margin-top: 40px;
    }

    p.name {
        padding-top: 15px;
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 0;
        cursor: pointer;
        color: whitesmoke;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
    }

    p.date {
        padding-top: 15px;
        font-weight: 600;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

</style>

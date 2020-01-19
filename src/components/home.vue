<template>
    <div class="container">
        <h1 id="title">{{title}}</h1>
        <hr>
        <p class="error" v-if="error">{{error}}</p>
        <h4>{{subtitle}}</h4>
        <div class="noTrips" v-if="tripsCopy.length <= 0">
            <p>You currently don't have any trips in your journal.</p>
            <p>Change that by adding your first <a style="cursor: pointer; font-weight: bolder; color:#8dd6d0; font-size: larger" @click="goTo('addTrip')">TRIP</a></p>
        </div>
        <div class="trips-container">
            <carousel :perPage="1"
                      :autoplay="true"
                      :loop="true"
                      :speed="1000"
                      pagination-active-color="#2c3e50">
                <slide v-for="(trip, index) in tripsCopy"
                       v-bind:item="trip"
                       v-bind:key="trip._id"
                       v-bind:index="index"
                >
                    <div class="slide-content">
                        <p class="date">{{`${new Date(trip.date).getDate()}/${new Date(trip.date).getMonth()+1}/${new
                            Date(trip.date).getFullYear()}`}}</p>
                        <p class="name">{{trip.name}}</p>
                    </div>
                </slide>
            </carousel>
        </div>
    </div>
</template>

<script>
    import TripService from "../TripService";
    import {Carousel, Slide} from 'vue-carousel';
    import router from "../router";

    export default {
        name: 'trips',
        components: {
            Carousel,
            Slide
        },
        data() {
            return {
                title: 'Travel journal',
                subtitle: 'Trips coming up this month:',
                trips: [],
                tripsCopy: [],
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
                this.tripsCopy = this.trips.filter(trip => new Date(trip.date).getMonth() === new Date().getMonth())
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
        padding-top: 5rem;
    }

    .trips-container {
        max-width: 700px;
        margin: auto;
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
        margin: 15px 0;
        height: 20vh;
    }

    h4 {
        color: #2c3e50;
    }

    p.name {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 0;
        cursor: pointer;
        color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
    }

    p.date {
        font-weight: 600;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

</style>

<template>
    <div class="container">
        <h1>{{title}}</h1>
        <div class="search-trip">
            <label for="search-trip">SEARCH..</label>
            <input type="search" v-on:keyup="searchTrip" v-model="searchWord" id="search-trip">
        </div>
        <hr>
        <p class="error" v-if="error">{{error}}</p>
        <div class="trips-container">
            <carousel :perPage="1"
                      :autoplay="true"
                      :speed="1000"
                      pagination-active-color="#2c3e50">
                <slide v-for="(trip, index) in tripsCopy"
                       v-bind:item="trip"
                       v-bind:key="trip._id"
                       v-bind:index="index"
                >
                    <div class="slide-content">
                        <p>{{`${trip.date.getDate()}/${trip.date.getMonth()+1}/${trip.date.getFullYear()}`}}</p>
                        <p class="name">{{trip.name}}</p>
                        <p class="country">{{trip.country}}</p>
                        <p class="price">${{trip.price}}</p>
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
                trips: [],
                tripsCopy: [],
                searchWord: '',
                error: '',
            }
        },
        async created() {
            try {
                this.trips = await TripService.getTrips();
                this.tripsCopy = this.trips;

            } catch (error) {
                this.error = error.message;
            }
        },
        async updated() {
            try {
                this.trips = await TripService.getTrips();
                this.tripsCopy = this.trips;

            } catch (error) {
                this.error = error.message;
            }
        },
        methods: {
            searchTrip() {
                this.tripsCopy = this.trips.filter((trip) => {
                    return trip.name.toLowerCase().includes(this.searchWord.toLowerCase())
                });
            },
            goTo(location) {
                router.push(location);
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .container {
        padding-top: 5rem;
    }

    .trips-container {
        max-width: 700px;
        margin: auto;
    }

    h1 {
        color: #8dd6d0;
        font-weight: bold;
        font-size: 77px;
        text-decoration: underline #2c3e50;
    }

    .search-trip {
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
        color: white;
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

<template>
    <div class="container">
        <h1>Travel journal</h1>
        <div class="nav">
            <!-- todo navigation could potentially by a separate component to reuse on other pages -->
            <button v-on:click="goTo('add')">Add trip</button>
            <button v-on:click="goTo('blog')">Go to blog</button>
        </div>
        <div class="search-trip">
            <label for="search-trip">SEARCH..</label>
            <input type="search" v-on:keyup="searchTrip" v-model="searchWord" id="search-trip">
        </div>
        <hr>
        <p class="error" v-if="error">{{error}}</p>
        <h3>Coming soon:</h3>
        <!-- todo: sort by date -->
        <div class="trips-container">
            <carousel :perPage="1"
                      :autoplay="true"
                      :speed="1000"
                      pagination-active-color="#4a6b63">
                <slide v-for="(trip, index) in tripsCopy"
                       v-bind:item="trip"
                       v-bind:key="trip._id"
                       v-bind:index="index"
                >
                    <div class="slide-content">
                        <p>{{`${trip.date.getDate()}/${trip.date.getMonth()}/${trip.date.getFullYear()}`}}</p>
                        <p class="name">{{trip.name}}</p>
                        <p class="country">{{trip.country}}</p>
                        <p class="price">${{trip.price}}</p>
                        <p v-on:dblclick="deleteTrip(trip._id)">x</p>
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
                trips: [
                    {
                        id: "1",
                        name: "Lorem ipsum",
                        country: "Germany",
                        price: "129.99",
                        date: new Date("2019-12-21T18:30:41.075+00:00")
                    },
                    {
                        id: "2",
                        name: "Lorem pisum",
                        country: "France",
                        price: "1299.99",
                        date: new Date("2019-12-10T18:30:41.075+00:00")
                    },
                    {
                        id: "3",
                        name: "Lorem cremsum",
                        country: "Germany",
                        price: "1209.99",
                        date: new Date("2019-12-09T18:30:41.075+00:00")
                    },
                    {
                        id: "4",
                        name: "Lorem pipisium",
                        country: "Germany",
                        price: "12009.99",
                        date: new Date("2020-12-21T18:30:41.075+00:00")
                    }
                ],
                tripsCopy: [],
                searchWord: '',
                error: '',
                name: '',
                country: '',
                price: '',
            }
        },
        async created() {
            try {
                // this.trips = await TripService.getTrips();
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
            async deleteTrip(id) {
                await TripService.deleteTrip(id);
                // this.trips = await TripService.getTrips();
            },
            goTo(location) {
                router.push(location);
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.container {
        max-width: 800px;
        margin: auto;
    }

    h1 {
        color: #8dd6d0;
    }

    .search-trip {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .search-trip > input {
        width: 50%;
    }

    p.error {
        border: 1px solid #ff5b5f;
        background-color: #ffc5c1;
        padding: 10px;
        margin-bottom: 15px;
    }

    .slide-content, .nav > button {
        border: 1px solid #4a6b63;
        border-radius: 60px;
        background-color: #8dd6d0;
        margin-bottom: 15px;
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

</style>

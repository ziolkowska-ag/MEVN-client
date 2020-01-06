<template>
    <div class="container">
        <h1>{{title}}</h1>
        <hr>
        <p class="error" v-if="error">{{error}}</p>
        <h4>{{subtitle}}</h4>
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
    // import TripService from "../TripService";
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
                trips: [
                    {
                        "_id": "5e0e679a3d73f70641d3c068",
                        "name": "Berlin Wall and other fun post war memorabilia",
                        "country": "Germany",
                        "price": "999.99",
                        "date": "2020-01-02T21:58:50.537Z"
                    },
                    {
                        "_id": "5e123df09d9ed92b60dda52e",
                        "name": "Florence fun",
                        "country": "Italy",
                        "price": "233.55",
                        "date": "2020-01-05T19:50:08.962Z"
                    },
                    {
                        "_id": "5e13309510257d03f394ba44",
                        "name": "Matrix",
                        "country": "UK",
                        "price": "199.99",
                        "date": "2020-01-06T13:05:25.957Z"
                    },
                    {
                        "_id": "5e1330b13477ed03f8d7ff8f",
                        "name": "Matrix",
                        "country": "UK",
                        "price": "199.99",
                        "date": "2020-07-01T13:05:53.544Z"
                    },
                    {
                        "_id": "5e133920ac25bb04ca6c0877",
                        "name": "Firebase/Firestor Advanced",
                        "country": "UK",
                        "price": "$",
                        "date": "2020-03-03T13:41:52.739Z"
                    },
                    {
                        "_id": "5e13392eac25bb04ca6c0878",
                        "name": "Elenor",
                        "country": "UK",
                        "price": "199.99",
                        "date": "2020-06-06T13:42:06.207Z"
                    }
                ],
                tripsCopy: [],
                error: '',
            }
        },
        async created() {
            try {
                // this.trips = await TripService.getTrips();
                // eslint-disable-next-line no-console
                this.tripsCopy = this.trips.filter(trip => new Date(trip.date).getMonth() === new Date().getMonth())
                    .sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
            } catch (error) {
                this.error = error.message;
            }
        },
        // async updated() {
        //     try {
        //         this.trips = await TripService.getTrips();
        //         this.tripsCopy = this.trips;
        //
        //     } catch (error) {
        //         this.error = error.message;
        //     }
        // },
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

    h1 {
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

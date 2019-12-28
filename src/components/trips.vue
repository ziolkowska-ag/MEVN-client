<template>
    <div class="container">
        <h1>Latest trips:</h1>
        <!--        create trip here TODO: move to a separate component-->
        <div class="create-trip" v-bind:class="{visible: isHidden}">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" placeholder="Name your trip..">
            <label for="country">Country:</label>
            <input type="text" id="country" v-model="country" placeholder="Where are you going..">
            <label for="price">Price:</label>
            <input type="text" id="price" v-model="price" placeholder="How much are you paying..">
            <hr>
            <button v-on:click="createTrip">Create!</button>
        </div>
        <button v-on:click="show">Add</button>
        <div class="search-trip">
            <label for="search-trip">SEARCH..</label>
            <input type="search" v-on:keyup="searchTrip" v-model="searchWord" id="search-trip">
        </div>
        <hr>
        <p class="error" v-if="error">{{error}}</p>
        <div class="trips-container">
            <!--            <div class="trip"-->
            <!--                 v-for="(trip, index) in tripsCopy"-->
            <!--                 v-bind:item="trip"-->
            <!--                 v-bind:index="index"-->
            <!--                 v-bind:key="trip._id"-->
            <!--            >-->
            <!--                <div class="date">-->
            <!--                    <p>{{`${trip.date.getDate()}/${trip.date.getMonth()}/${trip.date.getFullYear()}`}}</p>-->
            <!--                </div>-->
            <!--                &lt;!&ndash;                TODO: implement onclick for name - go to trips page &ndash;&gt;-->
            <!--                <p class="name">{{trip.name}}</p>-->
            <!--                <p class="country">{{trip.country}}</p>-->
            <!--                <p class="price">${{trip.price}}</p>-->
            <!--                <div class="delete">-->
            <!--                    <p v-on:dblclick="deleteTrip(trip._id)">x</p>-->
            <!--                </div>-->
            <!--            </div>-->
            <carousel :perPage="1" :autoplay="true">
                <slide v-for="(trip, index) in tripsCopy"
                       v-bind:item="trip"
                       v-bind:key="trip._id"
                       v-bind:index="index"
                >
                    <p>{{`${trip.date.getDate()}/${trip.date.getMonth()}/${trip.date.getFullYear()}`}}</p>
                    <p class="name">{{trip.name}}</p>
                    <p class="country">{{trip.country}}</p>
                    <p class="price">${{trip.price}}</p>
                    <p v-on:dblclick="deleteTrip(trip._id)">x</p>
                </slide>
            </carousel>
        </div>
    </div>
</template>

<script>
    import TripService from "../TripService";
    import {Carousel, Slide} from 'vue-carousel';


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
                isHidden: true,
                currentPage: 0,
                numOfPages: 0,
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
            async createTrip() {
                await TripService.createTrip(this.name, this.country, this.price);
                // this.trips = await TripService.getTrips();
            },
            searchTrip() {
                this.tripsCopy = this.trips.filter((trip) => {
                    return trip.name.toLowerCase().includes(this.searchWord.toLowerCase())
                });
            },
            async deleteTrip(id) {
                await TripService.deleteTrip(id);
                // this.trips = await TripService.getTrips();
            },
            show() {
                this.isHidden = false;
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

    .create-trip, .search-trip {
        display: flex;
        flex-direction: column;
    }

    .visible {
        display: none;
    }

    p.error {
        border: 1px solid #ff5b5f;
        background-color: #ffc5c1;
        padding: 10px;
        margin-bottom: 15px;
    }

    div.trip {
        position: relative;
        border: 1px solid #4a6b63;
        background-color: #8dd6d0;
        padding: 10px 10px 30px 10px;
        margin-bottom: 15px;
    }

    div.date {
        position: absolute;
        top: 0;
        bottom: 0;
        padding: 5px 15px;
        background-color: #4a6b63;
    }

    div.delete {
        position: absolute;
        top: 45%;
        bottom: 45%;
        right: 5%;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: #ff5b5f;
        color: whitesmoke;
    }

    p.name {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 0;
        cursor: pointer;
    }

    div.date > p {
        position: relative;
        top: 60px;
        transform: rotate(-90deg);
        color: #8dd6d0;
        font-size: 18px;
    }

    div.delete > p {
        position: relative;
        bottom: 23px;
        color: whitesmoke;
        font-size: 20px;
        font-weight: 700;
    }
</style>

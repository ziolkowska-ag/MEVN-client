<template>
    <div class="container">
        <h1>Latest trips:</h1>
        <!--        create trip here TODO: move to a separate component-->
        <div class="create-trip">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" placeholder="Name your trip..">
            <label for="country">Country:</label>
            <input type="text" id="country" v-model="country" placeholder="Where are you going..">
            <label for="price">Price:</label>
            <input type="text" id="price" v-model="price" placeholder="How much are you paying..">
            <hr>
            <button v-on:click="createTrip">Create!</button>
        </div>
        <hr>
        <div class="search-trip">
            <label for="search-trip">SEARCH..</label>
            <input type="search" v-on:keyup="searchTrip" v-model="searchWord" id="search-trip">
        </div>
        <hr>
        <p class="error" v-if="error">{{error}}</p>
        <div class="trips-container">
            <div class="trip"
                 v-for="(trip, index) in tripsCopy"
                 v-bind:item="trip"
                 v-bind:index="index"
                 v-bind:key="trip._id"
                 v-on:dblclick="deleteTrip(trip._id)"
            >
                <div class="date">
                    <p>{{`${trip.date.getDate()}/${trip.date.getMonth()}/${trip.date.getFullYear()}`}}</p>
                </div>
                <p class="name">{{trip.name}}</p>
                <p class="country">{{trip.country}}</p>
                <p class="price">${{trip.price}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import TripService from "../TripService";

    export default {
        name: 'TripComponent',
        data() {
            return {
                trips: [],
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
                this.trips = await TripService.getTrips();
                this.tripsCopy = this.trips;

            } catch (error) {
                this.error = error.message;
            }
        },
        methods: {
            async createTrip() {
                await TripService.createTrip(this.name, this.country, this.price);
                this.trips = await TripService.getTrips();
            },
            searchTrip() {
                this.tripsCopy = this.trips.filter((trip) => {
                    return trip.name.toLowerCase().includes(this.searchWord.toLowerCase())
                });
            },
            async deleteTrip(id) {
                await TripService.deleteTrip(id);
                this.trips = await TripService.getTrips();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.container {
        max-width: 800px;
        margin: auto;
    }

    .create-trip, .search-trip {
        display: flex;
        flex-direction: column;
    }

    p.error {
        border: 1px solid #ff5b5f;
        background-color: #ffc5c1;
        padding: 10px;
        margin-bottom: 15px;
    }

    div.trip {
        position: relative;
        border: 1px solid #5bd658;
        background-color: #bcffb8;
        padding: 10px 10px 30px 10px;
        margin-bottom: 15px;
    }

    div.date {
        position: absolute;
        top: 0;
        bottom: 0;
        padding: 5px 15px;
        background-color: darkolivegreen;
        color: whitesmoke;
        font-size: 13px;
    }

    p.name {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 0;
    }

    div.date > p {
        position: relative;
        top: 60px;
        transform: rotate(-90deg);
    }
</style>

<template>
    <div class="trips">
        <h1>{{title}}</h1>
        <div class="search-trip">
            <label for="search-trip">SEARCH..</label>
            <input type="search" v-on:keyup="searchTrip" v-model="searchWord" id="search-trip">
        </div>
        <hr>
        <p class="error" v-if="error">{{error}}</p>
        <div class="trips-container" v-for="(trip, index) in tripsCopy"
             v-bind:item="trip"
             v-bind:key="trip._id"
             v-bind:index="index">
            <p class="name">{{trip.name}}</p>
            <p class="country">{{trip.country}}</p>
            <p class="read-more" @click="goToSingleTrip(trip._id)">Learn more</p>
            <button class="delete" @click="deleteTrip(trip._id)">x</button>
        </div>
    </div>
</template>

<script>
    import router from "../router";
    import TripService from "../TripService";


    export default {
        name: 'trips',
        data() {
            return {
                title: 'Travel journal',
                trips: [],
                tripsCopy: [],
                searchWord: '',
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
                this.username = localStorage.getItem("username");
                await TripService.getUserId(this.username).then(res => {
                    this.user_id = res.id;
                });
                this.trips = await TripService.getTrips(this.user_id);
                this.tripsCopy = this.trips;
            },
            goToSingleTrip(id) {
                router.push({name: 'singleTrip', params: {Pid: id}});
            }
        }
    }
</script>


<style scoped>
    .read-more {
        color: #2c3e50;
        cursor: pointer;
        text-decoration: none;
        font-weight: 900;
    }

    .trips {
        padding-top: 5rem;
    }

    h1 {
        color: #8dd6d0;
        font-weight: bold;
        font-size: 55px;
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

    .trips-container {
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

<template>
    <form class="create-post">
        <ul class="container">
            <li class="form-row">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" placeholder="Name your post..">
            </li>
            <li class="form-row">
                <label for="country">Content:</label>
                <input type="text" id="country" v-model="text" placeholder="Say something..">
            </li>
            <li class="form-row">
                <label for="date">Date:</label>
                <input type="date" id="date" v-model="date">
            </li>
            <li class="form-row">
                <button v-on:click="createPost">Create!</button>
                <button v-on:click="goTo('/')">Go home!</button>
            </li>
        </ul>
    </form>
</template>

<script>
    import TripService from "../TripService";
    import router from "../router";

    export default {
        name: 'new_trip',
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
                error: '',
                name: '',
                country: '',
                price: '',
                date: ''
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
                await router.push('trips');
            },
            goTo(location) {
                router.push(location);
            }
        },
    }
</script>

<style scoped>
    .container {
        background-color: #8dd6d0;
        list-style: none;
        padding: 1.8em;
        border: 1px solid #4a6b63;
        border-radius: 60px;
        max-width: 900px;
        margin: 0 auto;
    }

    .form-row {
        display: flex;
        justify-content: center;
        padding: .5em;
    }

    @media (max-width: 600px) {
        .form-row {
            flex-direction: column;
        }
    }

    .form-row > label {
        padding: .5em .5em .5em 0;
        flex: 1;
        font-weight: bold;
        color: #4a6b63;
        font-size: 20px;
    }

    .form-row > input, .form-row > datepicker {
        flex: 5;
        padding: .5em;
        border: 1px solid #4a6b63;
        border-radius: 10px;
        font-size: 14px;
    }

    .form-row > button {
        background-color: #4a6b63;
        color: whitesmoke;
        margin-top: 25px;
        font-weight: bold;
        font-size: 14px;
        border: 1px solid #4a6b63;
        border-radius: 10px;
        width: 30%;
    }
</style>

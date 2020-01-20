<template>
    <form class="edit-trip">
        <h1 id="title">{{title}}</h1>
        <ul class="container">
            <li class="form-row">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="trip.name">
            </li>
            <li class="form-row">
                <label for="country">Country:</label>
                <input type="text" id="country" v-model="trip.country">
            </li>
            <li class="form-row">
                <label for="price">Price:</label>
                <input type="text" id="price" v-model="trip.price">
            </li>
            <li class="form-row">
                <label for="start_date">Start Date:</label>
                <input type="date" id="start_date" v-model="trip.start_date" :min="new Date(today)">
            </li>
            <li class="form-row">
                <label for="end_date">End Date:</label>
                <input type="date" id="end_date" v-model="trip.end_date" :min="trip.start_date">
            </li>
            <li class="form-row">
                <button v-on:click="editTrip">Save changes!</button>
            </li>
        </ul>
    </form>
</template>

<script>
    import TripService from "../TripService";
    import router from "../router";

    export default {
        name: 'edit_trip',
        data() {
            return {
                title: 'Edit trip',
                today: '',
                end_date: '',
                trip: '',
                error: '',
                username: '',
                user_id: '',
            }
        },
        methods: {
            editTrip() {
                TripService.updateTrip(this.user_id, this.trip._id, this.user_id, this.trip.name, this.trip.country, this.trip.price,
                    this.trip.start_date, this.trip.end_date);
                router.push({name: 'trips'});
            }
        },
        async created() {
            this.username = localStorage.getItem("username");
            TripService.getUserId(this.username).then(res => {
                this.user_id = res.id;
                TripService.getTrip(this.user_id, this.$route.params.Pid).then(trip => {
                    this.trip = trip;
                    this.today = new Date();
                });

            });
        }
    }
</script>

<style scoped>
    #title {
        color: #8dd6d0;
        font-weight: bold;
        font-size: 57px;
        text-decoration: underline #2c3e50;
        padding-bottom: 5px;
    }

    .edit-trip {
        padding-top: 2em;
    }

    .container {
        background-color: #8dd6d0;
        padding: 1.8em;
        border: 1px solid #4a6b63;
        border-radius: 5px;
        box-shadow: 0 0 1em #4a6b63;
        max-width: 900px;
        margin: 10px auto;
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
        color: white;
        margin-top: 25px;
        font-weight: bold;
        font-size: 14px;
        border: 1px solid #4a6b63;
        border-radius: 5px;
        width: 30%;
    }
</style>

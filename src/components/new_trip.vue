<template>
    <form class="create-trip">
        <ul class="container">
            <li class="form-row">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" placeholder="Name your trip..">
            </li>
            <li class="form-row">
                <label for="country">Country:</label>
                <input type="text" id="country" v-model="country" placeholder="Where are you going..">
            </li>
            <li class="form-row">
                <label for="price">Price:</label>
                <input type="text" id="price" v-model="price" placeholder="How much are you paying..">
            </li>
            <li class="form-row">
                <label for="date">Date:</label>
                <input type="date" id="date" v-model="date">
            </li>
            <li class="form-row">
                <button v-on:click="createTrip">Create!</button>
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
                error: '',
                name: '',
                country: '',
                price: '',
                date: ''
            }
        },
        methods: {
            createTrip() {
                TripService.createTrip(this.name, this.country, this.price);
                this.goTo('/trips');
            },
            goTo(location) {
                router.push(location);
            }
        },
    }
</script>

<style scoped>
    .create-trip {
        padding-top: 2em;
    }
    .container {
        background-color: #8dd6d0;
        padding: 1.8em;
        border: 1px solid #4a6b63;
        border-radius: 5px;
        box-shadow: 0 0 1em #4a6b63;
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
        color: white;
        margin-top: 25px;
        font-weight: bold;
        font-size: 14px;
        border: 1px solid #4a6b63;
        border-radius: 5px;
        width: 30%;
    }
</style>

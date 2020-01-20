<template>
    <form class="create-trip">
        <h1 id="title">{{title}}</h1>
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
                <label for="start_date">Start Date:</label>
                <input type="date" id="start_date" v-model="start_date">
            </li>
            <li class="form-row">
                <label for="end_date">End Date:</label>
                <input type="date" id="end_date" v-model="end_date">
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
                title: 'Add a new trip',
                error: '',
                name: '',
                country: '',
                price: '',
                start_date: '',
                end_date: '',
                username: '',
                user_id: '',
            }
        },
        methods: {
            createTrip() {
                TripService.createTrip(this.user_id, this.name, this.country, this.price, new Date(this.start_date), new Date(this.end_date));
                router.push({name: 'trips'})
            },
        },
        created() {
            this.username = localStorage.getItem("username");
            TripService.getUserId(this.username).then(res => {
                this.user_id = res.id;

                Date.prototype.yyyymmdd = function() {
                    let mm = this.getMonth() + 1; // getMonth() is zero-based
                    let dd = this.getDate();

                    return [this.getFullYear(),
                        (mm>9 ? '' : '0') + mm,
                        (dd>9 ? '' : '0') + dd
                    ].join('-');
                };

                this.start_date = new Date().yyyymmdd();
                document.getElementById("start_date").setAttribute("min", this.start_date);
                this.end_date = new Date().yyyymmdd();
                document.getElementById("end_date").setAttribute("min", this.end_date);
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

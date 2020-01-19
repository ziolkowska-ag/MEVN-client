<template>
    <div class="container">
        <div class="trip-container">
            <h1>{{trip.name}}</h1>
            <p class="date">{{`Date: ${day}/${month+1}/${year}`}}</p>
            <p class="country">Country: {{trip.country}}</p>
            <p class="price">Price: {{trip.price}}</p>
        </div>
    </div>
</template>

<script>
    import TripService from "../TripService";

    export default {
        name: 'singleTrip',
        data() {
            return {
                trip: {},
                day: '',
                month: '',
                year: '',
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
                this.trip = await TripService.getTrip(this.user_id, this.$route.params.Pid);
                this.day = new Date(this.trip.date).getDate();
                this.month = new Date(this.trip.date).getMonth();
                this.year = new Date(this.trip.date).getFullYear();

            } catch (error) {
                this.error = error.message;
            }
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.trip-container {
        max-width: 700px;
        border: 1px solid #4a6b63;
        border-radius: 5px;
        box-shadow: 0 0 1em #4a6b63;
        background-color: #8dd6d0;
        margin: 15px auto;
        padding-top: 10px;
    }

    h1 {
        color: #2c3e50;
        font-weight: bold;
        font-size: 55px;
    }

    .date {
        font-size: 20px;
        color: white;
    }

    .text {
        font-size: 25px;
    }

</style>

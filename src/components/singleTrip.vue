<template>
    <div class="container">
        <div class="trip-container">
            <h1 id="tripName">
                {{trip.name}}
                <img id="edit" src="../../public/assets/edit.png" width="35" height="35" @click="goTo(`/editTrip/${trip._id}`)">
            </h1>
            <p class="date">{{`FROM: ${start_day}/${start_month+1}/${start_year}`}}</p>
            <p class="date">{{`TO: ${end_day}/${end_month+1}/${end_year}`}}</p>
            <p class="country"><span id="countryLabel">Country:</span> {{trip.country}}</p>
            <p class="price"><span id="priceLabel">Price:</span> {{`${trip.price} $`}}</p>
        </div>
    </div>
</template>

<script>
    import TripService from "../TripService";
    import router from "../router";

    export default {
        name: 'singleTrip',
        data() {
            return {
                trip: {},
                start_day: '',
                start_month: '',
                start_year: '',
                end_day: '',
                end_month: '',
                end_year: '',
                month: '',
                year: '',
                username: '',
                user_id: '',
            }
        },
        methods: {
            goTo(location) {
                router.push(location);
            }
        },
        async created() {
            try {
                this.username = localStorage.getItem("username");
                await TripService.getUserId(this.username).then(res => {
                    this.user_id = res.id;
                });
                this.trip = await TripService.getTrip(this.user_id, this.$route.params.Pid);

                let startDate = this.trip.start_date;
                let endDate = this.trip.end_date;

                this.start_day = new Date(startDate).getDate();
                this.end_day = new Date(endDate).getDate();

                this.start_month = new Date(startDate).getMonth();
                this.end_month = new Date(endDate).getMonth();

                this.start_year = new Date(startDate).getFullYear();
                this.end_year = new Date(endDate).getFullYear();

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

    #tripName {
        color: #2c3e50;
        font-weight: bold;
        font-size: 35px;
    }

    .date {
        font-size: 18px;
        color: white;
    }

    #countryLabel, #priceLabel {
        font-weight: bolder;
        color: #2c3e50;
    }

    #edit {
        cursor: pointer;
    }
</style>

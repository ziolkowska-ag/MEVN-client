import axios from 'axios';

const url = 'http://localhost:5000/api/trips/';

class TripService {

    // GET trips
    static getTrips() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(trip => ({
                        ...trip,
                        date: new Date(trip.date)
                    }))
                );
            } catch (err) {
                reject(err);
            }
        });
    }


    // CREATE trip
    static createTrip(name, country, price) {
        return axios.post(url, {
            name,
            country,
            price
        });
    }

    // DELETE trip
    static deleteTrip(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default TripService;

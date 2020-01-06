import axios from 'axios';

const url = 'http://localhost:5000/api/trips/';

class TripService {

    static getTrips() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static getTrip(id) {
        return new Promise(async(resolve, reject) => {
            try {
                const res = await axios.get(`${url}${id}`);
                // eslint-disable-next-line no-console
                console.log('hello from tripservice: ',res.data);
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static createTrip(name, country, price, date) {
        return axios.post(url, {
            name,
            country,
            price,
            date,
        });
    }

    static deleteTrip(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default TripService;

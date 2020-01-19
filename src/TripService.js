import axios from 'axios';

const url = 'http://localhost:5000/api/trips/';
const user_url = 'http://localhost:5000/api/users/';

class TripService {

    static getTrips(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}${userId}`);
                const data = res.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static getTrip(userId, id) {
        return new Promise(async(resolve, reject) => {
            try {
                const res = await axios.get(`${url}/${userId}/${id}`);
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static getUserId(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${user_url}${username}`);
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static createTrip(created_by, name, country, price, start_date, end_date) {
        return axios.post(url, {
            created_by,
            name,
            country,
            price,
            start_date,
            end_date,
        });
    }

    static deleteTrip(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default TripService;

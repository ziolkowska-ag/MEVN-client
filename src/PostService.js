import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';
const user_url = 'http://localhost:5000/api/users/';
class PostService {

    static getPosts(userId) {
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

    static getPost(id) {
        return new Promise(async(resolve, reject) => {
            try {
                const res = await axios.get(`${url}${id}`);
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

    static createPost(title, text, date, created_by) {
        return axios.post(url, {
            created_by,
            title,
            text,
            date
        });
    }

    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;

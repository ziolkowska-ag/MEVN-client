import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

class PostService {

    // GET trips
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        date: new Date(post.date)
                    }))
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    static getPost(id) {
        return new Promise(async(resolve, reject) => {
            try {
                const res = await axios.get(`${url}${id}`);
                // eslint-disable-next-line no-console
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    // CREATE trip
    static createPost(title, text, date) {
        return axios.post(url, {
            title,
            text,
            date
        });
    }

    // DELETE trip
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;

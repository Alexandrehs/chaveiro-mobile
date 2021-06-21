import axios from 'axios';

const api = axios.create({
    baseURL: 'https://storage-spring.herokuapp.com/'
});

export default api;
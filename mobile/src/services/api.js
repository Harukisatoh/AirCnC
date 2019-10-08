import axios from 'axios';

const api = axios.create({
    baseURL: 'http://{your_ip}:3333',
});

export default api;
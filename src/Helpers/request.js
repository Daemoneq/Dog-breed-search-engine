import axios from 'axios';

const request = axios.create({
    baseURL: 'https://api.thedogapi.com/v1/breeds',
    validateStatus: null,
});

export default request;
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://oreon-burger-builder.firebaseio.com/'
});

export default instance;
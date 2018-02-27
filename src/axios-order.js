import axios from 'axios';
const instance = axios.create({
    baseURL : 'https://fireba-burgerapp.firebaseio.com/',

});
export default instance;
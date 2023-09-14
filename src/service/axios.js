import axios from 'axios';
import config from '../config';



const instance = axios.create({
    baseURL: config.BACKEND_URL,
    headers : {
        "Accept" : "application/json",
        // "Authorization" : `Bearer ${localStorage.getItem('auth-token')}` || "",
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': 'true'
    },
    withCredentials: true
})

instance.interceptors.request.use(function(config){
    config.headers.Authorization = `Bearer ${localStorage.getItem('auth-token')}`
    return config
}, function (error){
    return Promise.reject(error);
})

instance.interceptors.response.use(function(response){
    return response;
}, function(error){
    console.log(error)
    if(error.response?.status === 401){
        //window.location.href = '/login';
    }
    return Promise.reject(error);
})

export default instance
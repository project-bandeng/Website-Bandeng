import axios from 'axios';



const instance = axios.create({
    baseURL: "https://9faa-202-80-217-240.ngrok-free.app/",
    headers : {
        "Accept" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('auth-token')}` || "",
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': 'true'
    },
    withCredentials: true
})

instance.interceptors.response.use(function(response){
    return response;
}, function(error){
    console.log(error)
    if(error.response?.status === 401){
        window.location.href = '/login';
    }
    return Promise.reject(error);
})

export default instance
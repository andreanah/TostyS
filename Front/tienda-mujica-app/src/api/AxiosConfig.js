import axios from 'axios';

const axiosBase = axios.create({
    baseURL: 'https://localhost:5001/api'
});

var token = localStorage.getItem("token")
axiosBase.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export {axiosBase}
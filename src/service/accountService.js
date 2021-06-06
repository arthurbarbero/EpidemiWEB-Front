import axios from 'axios';

export function getAllUsers() {
    let url = "user/getAll"
    return axios.get(url).then(response => response)
}

export function authenticate(payload) {
    let url = "login/"
    return axios.post(url, payload)
}

export function RegisterUser(payload) {
    let url = "user/registerUser"
    return axios.post(url, payload)
}

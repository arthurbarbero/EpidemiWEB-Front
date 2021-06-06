import axios from 'axios';

export function getAllDisease() {
    let url = "disease/getAll";
    return axios.get(url)
}

export function insertDisease(data) {
    let url = "symptom/register";
    return axios.post(url, data)
}
import axios from 'axios';

export function insertSympton(data) {
    let url = "symptom/register";
    return axios.post(url, data)
}
import axios from 'axios';

export function insertSympton(data) {
    let url = "symptom/register"
    return axios.post(url, data)
}

export function getAllSymptoms() {
    let url = "symptom/getAll"
    return axios.get(url)
}

export function deleteSymptom(payload) {
    let url = `symptom/deleteById/${payload}`
    return axios.delete(url)
}
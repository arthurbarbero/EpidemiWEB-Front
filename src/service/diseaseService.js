import axios from 'axios'

export function getAllDisease() {
    let url = "disease/getAll";
    return axios.get(url)
}

export function insertDisease(data) {
    let url = "disease/register";
    return axios.post(url, data)
}

export function deleteDisease(id) {
    let url = `disease/deleteById/${id}`;
    return axios.delete(url)
}
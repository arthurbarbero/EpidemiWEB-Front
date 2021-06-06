import axios from 'axios'

export function insertIncidence(payload) {
    let url = 'incidence/register'
    return axios.post(url, payload)
}

export function getAllIncidence() {
    let url = 'incidence/getAll'
    return axios.get(url)
}

export function deleteIncidence(payload) {
    let url = `incidence/deleteById/${payload}`
    return axios.delete(url)
}
import axios from 'axios';

export function getAllDisease() {
    let url = "disease/getAll";
    return axios.get(url).then(response => response)
}

import axios from 'axios';

export class diseaseService {
    constructor() {}

    getAllDisease() {
        let url = "disease/getAll";
        return axios.get(url).then(response => response)
    }
}
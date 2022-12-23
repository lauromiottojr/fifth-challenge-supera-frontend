import axios from 'axios';

const statementFetch = axios.create({
    baseURL: "https://supera-challenge.herokuapp.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default statementFetch
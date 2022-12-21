import axios from 'axios';

const statementFetch = axios.create({
    baseURL: "https://supera-challenge.herokuapp.com",
    headers: {
        "Content-Type": "application/json",
    },
    data: JSON.stringify({
        id: 'test',
        command: 'echo michael'
    }),
});

export default statementFetch
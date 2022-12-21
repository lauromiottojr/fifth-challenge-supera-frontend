import axios from 'axios'

const statementFetch = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default statementFetch
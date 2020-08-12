import axios from 'axios';

const ajax = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
})

export default ajax;
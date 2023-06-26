import axios from "axios";

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': '63052fc1-39d2-496e-872a-b5f91fbb5674'
    }
})






import { ACCESS_TOKEN } from "../assets/constants";
import api from "./api";


export const loginAuth = async (data) => {
    try{
        const res = await api.post('/auth/login', data);
        return res;

    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const getAccessToken = async () => { 
    try {
        const res = await api.get('/auth/refresh');
        const accessToken = res.data?.accessToken; 

        if (accessToken) {
            localStorage.setItem(ACCESS_TOKEN, accessToken); 
        }

        return accessToken;

    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const logoutUser = async () =>{
    try{
        const res = await api.get('/auth/logout');
        await localStorage.removeItem(ACCESS_TOKEN);
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const getloginUser = async () => {
    try {
        const res = await api.get('/user/');
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}
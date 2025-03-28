import api from "./api";

export const addNewEvent = async (formData) =>{
    try {
        const res = await api.post('/event/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const getAllEvent = async () =>{
    try {
        const res = await api.get('/event');
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const deleteEvent = async (id) =>{
    try {
        const res = await api.delete(`/event/${id}`);
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const addUserInEvent = async (data, id) =>{
    try {
        const res = await api.put(`/event/${id}/add-user`, data);
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const checkEventandUSer = async (id) =>{
    try {
        const res = await api.get(`/event/checkuserisin/${id}`);
        return res.data?.isRegistered;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}
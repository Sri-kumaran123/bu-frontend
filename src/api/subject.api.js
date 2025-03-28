
import api from "./api";

export const addNewSubject = async (data) =>{
    try {
        const res = api.post('/subject',data);
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const getallSubject = async () => {
    try {
        const res = api.get('/subject');
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const editSubject = async (data,id) => {
    try {
        const res = api.put(`/subject/${id}`);
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const deleteSubject = async (id) => {
    try {
        const res = api.delete(`/subject/${id}`);
        return res;
    } catch (err) {
        console.log(err.message);
    }
}
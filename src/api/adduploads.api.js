import api from "./api";

export const uploadDocumentApi = async (formData) =>{
    try {
        const res = await api.post('/document-route/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const getDocumentByUserApi = async (id) =>{
    try {
        const res = await api.get(`/document-route/user/${id}`);
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const getAllDocumentsApi = async () =>{
    try {
        const res = await api.get('/document-route/all');
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const setAsOldDocumentApi = async (id) => {
    try {
        const res = await api.put(`/document-route/mark-old/${id}`);
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const getDocumentByNewApi = async () =>{
    try {
        const res = await api.get('/document-route/new');
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const deleteDocumentApi = async (id) => {
    try {
        const res = await api.delete(`/document-route/deleted/${id}`);
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}
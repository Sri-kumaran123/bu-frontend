import api from "./api";


export const addCircularApi = async (formData) =>{
    try {
        const res = await api.post('/circular', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const deleteCircularApi = async (id) =>{
    try {
        const res = api.delete(`/circular/${id}`);
        return res;

    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const getAllCircularsApi = async () => {
    try {
        const res = await api.get('/circular');
        return res.data; // Return only the data
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
};
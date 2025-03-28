import api from "./api";

export const createBatch =async (course) =>{
    try {
        const res = await api.post('/batch', course);
        return res;

    } catch (err){
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const getBatch = async () => {
    try {
        const res = api.get('/batch');
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const updateBatchYear = async (data, id) => {
    try {
        const res = api.put(`/batch/${id}/year`, data);
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const updateBatchSemester = async (data, id) =>{
    try {
        const res = api.put(`/batch/${id}/semester`, data);
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const getAllBatch = async () =>{
    try {
        const res = api.get('/batch/all');
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}
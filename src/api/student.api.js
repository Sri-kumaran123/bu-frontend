import api from "./api";

export const uploadStudent = async (formData, id) => {
    try {
        const res = await api.post(`/student/upload-students/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const updateStudent = async (data) =>{
    try {
        const res = await api.post('/student/update', data);
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

export const getOneStudent = async () =>{
    try {
        const res = await api.get('/student/st');
        return res;
    } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
    }
}
import api from "./api";

// Create a new semester
export const createNewSemester = async (data) => {
    try {
        const res = await api.post('/semester/semester/add', data);
        return res.data;
    } catch (err) {
        console.error("Error creating semester:", err);
        return Promise.reject(err);
    }
};

// Add a new subject to a semester
export const addNewSubject = async (data) => {
    try {
        const res = await api.post('/semester/semester/subject/add', data);
        return res.data;
    } catch (err) {
        console.error("Error adding subject:", err);
        return Promise.reject(err);
    }
};

// Delete a subject from a semester
export const deleteSubject = async (data) => {
    try {
        const res = await api.delete('/semester/semester/subject/remove', { data });
        return res.data;
    } catch (err) {
        console.error("Error deleting subject:", err);
        return Promise.reject(err);
    }
};

// Get semester details
export const getSemester = async (batchId, semester) => {
    try {
        const res = await api.post('/semester/semestera', { batch:batchId, sem:semester});
        return res.data;
    } catch (err) {
        console.error("Error fetching semester:", err);
        return Promise.reject(err);
    }
};

// Get all semesters
export const getAllSemesters = async () => {
    try {
        const res = await api.get('/semester/semesters');
        return res.data;
    } catch (err) {
        console.error("Error fetching all semesters:", err);
        return Promise.reject(err);
    }
};

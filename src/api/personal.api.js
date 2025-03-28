import api from "./api";
const personalAPI = {
    // Get personal profile by user ID
    getPersonalByUser: async (userId) => {
      try {
        const response = await api.get(`/personal/${userId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching personal profile:", error.response?.data || error.message);
        throw error;
      }
    },
  
    // Create a new personal profile
    createNewPersonal: async (data) => {
      try {
        const response = await api.post(`/personal/create`, data);
        return response.data;
      } catch (error) {
        console.error("Error creating personal profile:", error.response?.data || error.message);
        throw error;
      }
    },
  
    // Update an existing personal profile
    updatePersonal: async (data) => {
      try {
        const response = await api.put(`/personal/update`, data);
        return response.data;
      } catch (error) {
        console.error("Error updating personal profile:", error.response?.data || error.message);
        throw error;
      }
    }
  };
  
  export default personalAPI;
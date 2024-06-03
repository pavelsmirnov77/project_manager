import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "/api/admin/users";

const deleteUser = (userId) => {
    return axios.delete(`${API_URL}/${userId}`, { headers: authHeader() });
};

const blockUser = (userId) => {
    return axios.put(`${API_URL}/${userId}/block`, {}, { headers: authHeader() });
};

const unblockUser = (userId) => {
    return axios.put(`${API_URL}/${userId}/unblock`, {}, { headers: authHeader() });
};

const adminService = {
    deleteUser,
    blockUser,
    unblockUser,
};

export default adminService;

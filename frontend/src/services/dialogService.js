import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "/api/dialogs";

const dialogService = {
    getDialog: (senderId, recipientId) => {
        return axios.get(`${API_URL}/find`, {
            params: {senderId, recipientId},
            headers: authHeader()
        }).then(response => {
            return response.data;
        });
    },

    createDialog: (senderId, recipientId) => {
        return axios.post(`${API_URL}/create`, null, {
            params: {senderId, recipientId},
            headers: authHeader()
        }).then(response => {
            return response.data;
        });
    },

    deleteDialog: (id) => {
        return axios.delete(`${API_URL}/delete/${id}`, {
            headers: authHeader()
        });
    },

    getAllDialogsByUserId: (userId) => {
        return axios.get(`${API_URL}/user/${userId}`, {
            headers: authHeader()
        }).then(response => {
            return response.data;
        });
    }
};

export default dialogService;

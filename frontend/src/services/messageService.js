import axios from 'axios';
import authHeader from './authHeader';

const API_URL = '/api/messages';

class MessageService {
    sendMessage(dialogId, senderId, recipientId, text) {
        return axios.post(`${API_URL}/send`, null, {
            params: {dialogId, senderId, recipientId, text},
            headers: authHeader()
        }).then(response => response.data)
            .catch(error => {
                const _content = (error.response && error.response.data) || error.message || error.toString();
                console.error("Ошибка при отправке сообщения:", _content);
                throw error;
            });
    }

    editMessage(id, newText) {
        return axios.put(`${API_URL}/edit/${id}`, null, {
            params: {newText},
            headers: authHeader()
        }).then(response => response.data)
            .catch(error => {
                const _content = (error.response && error.response.data) || error.message || error.toString();
                console.error("Ошибка при редактировании сообщения:", _content);
                throw error;
            });
    }

    deleteMessage(id) {
        return axios.delete(`${API_URL}/delete/${id}`, {headers: authHeader()})
            .then(response => response.data)
            .catch(error => {
                const _content = (error.response && error.response.data) || error.message || error.toString();
                console.error("Ошибка при удалении сообщения:", _content);
                throw error;
            });
    }

    getMessagesByDialogId(dialogId) {
        return axios.get(`${API_URL}/dialog/${dialogId}`, {headers: authHeader()})
            .then(response => response.data)
            .catch(error => {
                const _content = (error.response && error.response.data) || error.message || error.toString();
                console.error("Ошибка при получении сообщений:", _content);
                throw error;
            });
    }
}

export default new MessageService();

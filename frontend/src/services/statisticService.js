import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "/api/statistics";

const getStatisticsByUserId = (userId) => {
    return axios.get(`${API_URL}/${userId}`, {
        headers: authHeader()
    })
        .then(response => {
            console.log("Статистика получена для пользователя с ID", userId);
            return response.data;
        })
        .catch(error => {
            console.error("Ошибка при получении статистики для пользователя с ID", userId, error);
            return null;
        });
};

const getAllStatistics = () => {
    return axios.get(API_URL, {
        headers: authHeader()
    })
        .then(response => {
            console.log("Все статистические данные получены");
            return response.data;
        })
        .catch(error => {
            console.error("Ошибка при получении всех статистических данных", error);
            return [];
        });
};

const statisticService = {
    getStatisticsByUserId,
    getAllStatistics
};

export default statisticService;

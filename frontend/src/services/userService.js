import axios from "axios";
import {setUser} from "../slices/userSlice";
import authHeader from "./authHeader";

const API_URL = "/users";

const getUser = (id, dispatch) => {
    return axios.get(API_URL + `/${id}`, {headers: authHeader()}).then(
        (response) => {
            dispatch(setUser(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setUser([]));
        });
};

const uploadProfilePicture = (userId, file) => {
    let formData = new FormData();
    formData.append("file", file);
    return axios.post(API_URL + `/${userId}/profile-picture`, formData, {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    });
};

const getProfilePicture = (userId) => {
    return axios.get(API_URL + `/${userId}/profile-picture`, {
        responseType: 'arraybuffer',
        headers: authHeader()
    });
};

const updateUserName = (userId, newName, dispatch) => {
    return axios.put(API_URL + `/${userId}/name`, {name: newName}, {headers: authHeader()})
        .then(response => {
            const user = JSON.parse(localStorage.getItem("user"));
            user.name = newName;
            localStorage.setItem("user", JSON.stringify(user));

            dispatch(setUser(user));

            return response.data;
        });
};

const updateUserGroup = (userId, newGroup, dispatch) => {
    return axios.put(API_URL + `/${userId}/group`, {group: newGroup}, {headers: authHeader()})
        .then(response => {
            const user = JSON.parse(localStorage.getItem("user"));
            user.group = newGroup;
            localStorage.setItem("user", JSON.stringify(user));

            dispatch(setUser(user));

            return response.data;
        });
};

const getAllUsers = (dispatch) => {
    return axios.get(API_URL + `/all`, {headers: authHeader()})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Ошибка при получении списка пользователей:", error);
            throw error;
        });
};

const userService = {
    getUser,
    uploadProfilePicture,
    getProfilePicture,
    updateUserName,
    updateUserGroup,
    getAllUsers,
};

export default userService
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


const userService = {
    getUser,
    uploadProfilePicture,
    getProfilePicture
};

export default userService
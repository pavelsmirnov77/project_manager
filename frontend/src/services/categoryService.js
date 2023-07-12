import axios, {get} from "axios";
import authHeader from "./authHeader";
import {setCategory} from "../slices/categorySlice";

const API_URL = "http://localhost:8081/todo/note"


const getCategories = (dispatch) => {
    return axios.get(API_URL).then(
        (response) => {
            dispatch(setCategory(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setCategory([]));
        });

};

const createCategory = (category, dispatch) => {
    return axios.post(API_URL, category, {headers: authHeader()}).then(
        (response) => {
            getCategories(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

export const updateCategory = async (category) => {
    try {
        const response = await axios.put(API_URL, category);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

export const deleteCategoryById = async (categoryId) => {
    try {
        await axios.delete(API_URL + `${categoryId}`);
    } catch (error) {
        throw new Error(error.response.data);
    }
};

const categoryService = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategoryById
};

export default categoryService;
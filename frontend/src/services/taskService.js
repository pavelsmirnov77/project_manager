import axios from "axios";
import {
    set,
    setPriorities,
    setRegularities,
    setSelectedTask,
    setStatuses,
} from "../slices/taskSlice";
import authHeader from "./authHeader";
import {setAllCategories} from "../slices/categorySlice";

const API_URL = "/todo/tasks";

const getAllTasks = (dispatch) => {
    return axios
        .get(API_URL, {headers: authHeader()})
        .then(
            (response) => {
                dispatch(set(response.data));
                return response.data;
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                console.error(_content);

                dispatch(set([]));
                dispatch(setAllCategories([]));
            }
        );
};

const getTasksFromCategory = (category_id, dispatch) => {
    return axios
        .get(API_URL + `/${category_id}`, {headers: authHeader()})
        .then(
            (response) => {
                dispatch(set(response.data));
                return response.data;
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                console.error(_content);

                dispatch(set([]));
            }
        );
};



const getStatuses = (dispatch) => {
    return axios
        .get(API_URL + "/statuses", {headers: authHeader()})
        .then(
            (response) => {
                dispatch(setStatuses(response.data));
                return response.data;
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                console.error(_content);

                dispatch(setStatuses([]));
            }
        );
};

const getRegularities = (dispatch) => {
    return axios
        .get(API_URL + "/regularities", {headers: authHeader()})
        .then(
            (response) => {
                dispatch(setRegularities(response.data));
                return response.data;
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                console.error(_content);

                dispatch(setRegularities([]));
            }
        );
};

const getPriorities = (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.accessToken : null;

    if (token) {
        return axios
            .get(API_URL + "/priorities", {headers: authHeader()})
            .then(
                (response) => {
                    dispatch(setPriorities(response.data));
                    return response.data;
                },
                (error) => {
                    const _content =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();

                    console.error(_content);

                    dispatch(setPriorities([]));
                }
            );
    }
};

const createTask = (category_id, task, dispatch) => {
    const url = `/todo/tasks?categoryId=${category_id}`;

    return axios.post(url, task, {headers: authHeader()}).then(
        () => {
            return getTasksFromCategory(category_id, dispatch);
        },
        (error) => {
            const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content);
        }
    );
};

const updateTask = (category_id, task, dispatch) => {
    return axios.put(API_URL, task, {headers: authHeader()}).then(
        () => {
            getTasksFromCategory(category_id, dispatch);
        },
        (error) => {
            const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content);
        }
    );
};

const selectTask = (task, dispatch) => {
    dispatch(setSelectedTask(task));
};

const deleteTask = (taskId, category_id, dispatch) => {
    const url = "/trash" + `/${taskId}`;

    return axios.delete(url, {headers: authHeader()}).then(
        () => {
            return getTasksFromCategory(category_id, dispatch);
        },
        (error) => {
            const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content);
        }
    );
};

const taskService = {
    getAllTasks,
    getTasksFromCategory,
    getPriorities,
    getRegularities,
    getStatuses,
    createTask,
    updateTask,
    selectTask,
    deleteTask
};

export default taskService;

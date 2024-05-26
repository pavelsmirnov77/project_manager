import axios from "axios";
import {
    set,
    setPriorities,
    setRegularities,
    setSelectedTask,
    setStatuses,
} from "../slices/taskSlice";
import authHeader from "./authHeader";
import {setAllProjects} from "../slices/projectSlice";

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
                dispatch(setAllProjects([]));
            }
        );
};

const getTaskById = (taskId) => {
    return axios
        .get(`${API_URL}/${taskId}`, {headers: authHeader()})
        .then(
            (response) => {
                return response.data;
            },
            (error) => {
                console.error("Ошибка при получении задачи по идентификатору", error);
                return null;
            }
        );
};

const getTasksFromProjects = (project_id, dispatch) => {
    return axios
        .get(API_URL + `/project/${project_id}`, {headers: authHeader()})
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

const getTasksByStatus = (statusId, dispatch) => {
    return axios
        .get(`${API_URL}/status/${statusId}`, {headers: authHeader()})
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

const createTask = (project_id, task, dispatch) => {
    const url = `/todo/tasks?projectId=${project_id}`;

    return axios.post(url, task, {headers: authHeader()}).then(
        () => {
            return getTasksFromProjects(project_id, dispatch);
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

const updateTask = (project_id, task, dispatch) => {
    return axios.put(API_URL, task, {headers: authHeader()}).then(
        () => {
            getTasksFromProjects(project_id, dispatch);
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

const deleteTask = (taskId, project_id, dispatch) => {
    const url = "/trash" + `/${taskId}`;

    return axios.delete(url, {headers: authHeader()}).then(
        () => {
            return getAllTasks(dispatch);
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

const updateTaskStatus = (taskId, statusId, dispatch) => {
    return axios.put(`${API_URL}/${taskId}/status/${statusId}`, null, { headers: authHeader() }).then(
        (response) => {
            console.log("Статус задачи обновлен успешно");
            getAllTasks(dispatch);
            return response.data;
        },
        (error) => {
            console.error("Ошибка при обновлении статуса задачи", error);
            return null;
        }
    );
};


const taskService = {
    getAllTasks,
    getTasksFromProjects,
    getPriorities,
    getRegularities,
    getStatuses,
    getTasksByStatus,
    createTask,
    updateTask,
    selectTask,
    deleteTask,
    updateTaskStatus,
    getTaskById
};

export default taskService;

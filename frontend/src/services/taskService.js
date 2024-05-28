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
    return axios.put(`${API_URL}/${taskId}/status/${statusId}`, null, {headers: authHeader()}).then(
        (response) => {
            console.log("Статус задачи обновлен успешно");
            return response.data;
        },
        (error) => {
            console.error("Ошибка при обновлении статуса задачи", error);
            return null;
        }
    );
};

const assignUserToTask = (taskId, userId, dispatch) => {
    return axios.put(`/todo/tasks/${taskId}/assign/${userId}`, null, {headers: authHeader()}).then(
        (response) => {
            console.log("Исполнитель задачи успешно обновлен");
            return response.data;
        },
        (error) => {
            console.error("Ошибка при обновлении исполнителя задачи", error);
            return null;
        }
    );
};

const updateTaskComplexity = (taskId, complexity) => {
    return axios.put(`${API_URL}/${taskId}/complexity?complexity=${complexity}`, null, {headers: authHeader()}).then(
        (response) => {
            console.log("Трудозатраты задачи обновлены успешно");
            return response.data;
        },
        (error) => {
            console.error("Ошибка при обновлении трудозатрат задачи", error);
            return null;
        }
    );
};

const updateCurrentComplexity = (taskId, currentComplexity) => {
    return axios.put(`${API_URL}/${taskId}/currentComplexity?currentComplexity=${currentComplexity}`, null, {headers: authHeader()}).then(
        (response) => {
            console.log("Текущие трудозатраты задачи обновлены успешно");
            return response.data;
        },
        (error) => {
            console.error("Ошибка при обновлении текущих трудозатрат задачи", error);
            return null;
        }
    );
};

const addCommentToTask = (taskId, userId, content, file) => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("content", content);
    formData.append("file", file);

    return axios.post(`${API_URL}/${taskId}/comments`, formData, {
        headers: {
            ...authHeader(),
            "Content-Type": "multipart/form-data"
        }
    }).then(
        (response) => {
            console.log("Комментарий успешно добавлен к задаче");
            return response.data;
        },
        (error) => {
            console.error("Ошибка при добавлении комментария к задаче", error);
            return null;
        }
    );
};

const taskService = {
    getAllTasks,
    getTasksFromProjects,
    getPriorities,
    getStatuses,
    getTasksByStatus,
    createTask,
    updateTask,
    selectTask,
    deleteTask,
    updateTaskStatus,
    getTaskById,
    assignUserToTask,
    updateTaskComplexity,
    updateCurrentComplexity,
    addCommentToTask
};

export default taskService;

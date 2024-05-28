import axios from "axios";
import {setAllProjects, setSelectedProject} from "../slices/projectSlice";
import authHeader from "./authHeader";

const API_URL = "/todo/note";

const getProjects = (dispatch) => {
    return axios.get(API_URL, {headers: authHeader()}).then((response) => {
            dispatch(setAllProjects(response.data))
            return response.data;
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setAllProjects([]));
        });
};

export const getProjectsForUser = (userId, dispatch) => {
    return axios.get(`/todo/note/${userId}`, { headers: authHeader() })
        .then((response) => {
            dispatch(setAllProjects(response.data));
            return response.data;
        })
        .catch((error) => {
            console.error("Ошибка при получении списка проектов для пользователя:", error);
            dispatch(setAllProjects([]));
            throw error;
        });
};

export const createProject = (project, dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.accessToken : null;
    if (token) {
        return axios
            .post(API_URL, project, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(
                (response) => {
                    getProjects(dispatch);
                })
            .catch((error) => {
                const _content =
                    (error.response && error.response.data)
                error.message ||
                error.toString();

                console.error(_content);
            });
    }
};

export const updateProject = (id, project, dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.accessToken : null;

    if (token) {
        return axios
            .put(API_URL + `/${id}`, project, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(
                (response) => {
                    getProjects(dispatch);
                }
            )
            .catch((error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                console.error(_content);
            });
    }
};

export const deleteProject = (id, dispatch) => {
    return axios
        .delete(API_URL + `/${id}`, {headers: authHeader()})
        .then(
            (response) => {
                getProjects(dispatch);
            },
            (error) => {
                const _content = (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                console.error(_content);
            }
        );
};

export const addUserToProject = (projectId, userId, dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.accessToken : null;

    if (token) {
        return axios
            .post(
                `${API_URL}/${projectId}/users/${userId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(
                (response) => {
                    getProjects(dispatch);
                }
            )
            .catch((error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                console.error(_content);
            });
    }
};

export const removeUserFromProject = (projectId, userId, dispatch) => {
    return axios
        .delete(`${API_URL}/${projectId}/users/${userId}`, {
            headers: authHeader(),
        })
        .then(
            (response) => {
                getProjects(dispatch);
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

export const getUsersByProjectId = (projectId) => {
    return axios.get(`${API_URL}/${projectId}/users`, {headers: authHeader()})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Ошибка при получении списка пользователей:", error);
            throw error;
        });
};

const selectProject = (project, dispatch) => {
    localStorage.removeItem("selected_project");
    localStorage.setItem("selected_project", JSON.stringify(project));
    dispatch(setSelectedProject(project));
};

const projectService = {
    getProjects,
    getProjectsForUser,
    createProject,
    updateProject,
    deleteProject,
    addUserToProject,
    removeUserFromProject,
    getUsersByProjectId,
    selectProject,
};

export default projectService;

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

const selectProject = (project, dispatch) => {
    localStorage.removeItem("selected_project");
    localStorage.setItem("selected_project", JSON.stringify(project));
    dispatch(setSelectedProject(project));
};

const projectService = {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    selectProject,
};

export default projectService;

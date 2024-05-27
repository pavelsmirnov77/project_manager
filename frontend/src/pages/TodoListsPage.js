import React, {useEffect, useState} from "react";
import MenuBar from "../components/MenuBar";
import {Input, Button, Form, Empty, message} from "antd";
import {
    PlusOutlined,
    AppstoreAddOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "moment/locale/ru";
import taskService from "../services/taskService";
import ProjectCard from "../components/ProjectCard";
import ProjectService from "../services/projectService";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

moment.locale("ru");

export const TodoListsPage = () => {
    const {id} = useParams();
    const [projectName, setProjectName] = useState("");
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.projects);
    const [form] = Form.useForm();
    const selectedProject = useSelector((state) => state.projects.selectedProject);
    const projectsIds = projects.map((project) => project.id);

    useEffect(() => {
        if (selectedProject && projectsIds.includes(selectedProject.id)) {
            taskService.getTasksFromProjects(id, dispatch);
        }
    }, [selectedProject]);

    const handleProjectInputChange = (e) => {
        setProjectName(e.target.value);
    };

    const setProject = (id) => {
        ProjectService.selectProject(id, dispatch)
    }

    const handleCreateProject = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const currentUserId = user ? user.id : null;
        if (currentUserId) {
            const newProject = {
                name: projectName,
                id: projects.length + 1,
                user: {id: currentUserId}
            };
            ProjectService.createProject(newProject, dispatch).then(() => {
                message.success(`Проект "${newProject.name}" успешно создан!`)
                ProjectService.getProjects(dispatch);
            })
        }
    };

    useEffect(() => {
        ProjectService.getProjects(dispatch)
    }, []);

    const handleEditProject = (projectId, newTitle) => {
        const updatedProjects = projects.map((project) => {
            if (project.id === projectId) {
                return {...project, title: newTitle};
            }
            return project;
        });
        setProject(updatedProjects);
    };

    const handleAddTask = (projectId) => {
        console.log("Добавление задачи в проект:", projectId);
    };

    return (
        <Form form={form}>
            <div>
                <MenuBar/>
                <div
                    style={{
                        top: "200px",
                    }}
                >
                    <div style={{
                        marginLeft: "650px",
                    }}>
                        <Input
                            style={{marginRight: "8px", width: "850px"}}
                            placeholder="Введите название проекта"
                            value={projectName}
                            onChange={handleProjectInputChange}
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined/>}
                            onClick={handleCreateProject}
                            style={{
                                backgroundColor: "#333232",
                                borderColor: "#333232",
                                color: "white",
                            }}
                            htmlType="submit"
                        />
                    </div>

                    {projects.length === 0 ? (
                        <Empty style={{marginTop: "150px"}}
                               image={<AppstoreAddOutlined style={{fontSize: 64, color: "rgba(0, 0, 0, 0.5)"}}/>}
                               description={<span
                                   style={{color: "rgba(0, 0, 0, 0.5)", fontSize: 20}}>Список задач пуст</span>}
                        />
                    ) : (
                        <div style={{marginTop: "30px", marginRight: "100px"}}>
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    handleEditProject={handleEditProject}
                                    handleAddTask={handleAddTask}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Form>
    );
};

export default TodoListsPage;

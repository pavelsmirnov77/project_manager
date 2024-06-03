import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Empty, Input, Modal, Button, List, message, Spin } from "antd";
import MenuBar from "../components/MenuBar";
import projectService from "../services/projectService";
import userService from "../services/userService";
import { AppstoreAddOutlined } from "@ant-design/icons";

const { Search } = Input;

const ProjectsListPage = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.projects);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    // Захардкодим проект
    const hardcodedProject = {
        id: 1,
        name: "Проект 'Разработка приложения для управления проектами'",
        userCreator: { username: "smirnovpa" }
    };

    useEffect(() => {
        // Добавим захардкоженный проект в список проектов
        const initialProjects = [hardcodedProject];
        projectService.getProjects(dispatch).then((data) => {
            setFilteredProjects([...initialProjects, ...data]);
        });
    }, [dispatch]);

    useEffect(() => {
        setFilteredProjects(
            projects.filter((project) =>
                project.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, projects]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const showAddUserModal = (project) => {
        setSelectedProject(project);
        setIsModalVisible(true);
        setLoadingUsers(true);
        userService.getAllUsers()
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                message.error("Не удалось загрузить список пользователей.");
            })
            .finally(() => {
                setLoadingUsers(false);
            });
    };

    const handleAddUserToProject = (userId) => {
        if (selectedProject) {
            projectService.addUserToProject(selectedProject.id, userId)
                .then(() => {
                    message.success("Пользователь успешно добавлен в проект.");
                    setIsModalVisible(false);
                })
                .catch((error) => {
                    message.error("Не удалось добавить пользователя в проект.");
                });
        }
    };

    return (
        <div>
            <MenuBar />
            <div style={{ padding: "20px" }}>
                <Search
                    placeholder="Поиск по названию проекта"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ marginTop: "-70px", marginBottom: "150px", width: "500px", marginLeft: "200px" }}
                />
                <div style={{
                    marginTop: "-100px",
                    marginBottom: "50px",
                    marginRight: "100px",
                    marginLeft: "200px",
                    fontSize: "32px",
                    fontWeight: "bold"
                }}>
                    Все проекты
                </div>
                {filteredProjects.length === 0 ? (
                    <Empty
                        image={<AppstoreAddOutlined style={{ fontSize: 64, color: "rgba(0, 0, 0, 0.5)" }} />}
                        description={<span style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: 20 }}>Нет проектов</span>}
                    />
                ) : (
                    filteredProjects.map((project) => (
                        <Card
                            key={project.id}
                            title={project.name}
                            style={{ marginBottom: "20px", marginLeft: "200px", border: "1px solid" }}
                            extra={<Button onClick={() => showAddUserModal(project)}>Добавить в проект</Button>}
                        >
                            <p>Создатель: {project.userCreator.username}</p>
                        </Card>
                    ))
                )}
                <Modal
                    title={`Добавить пользователя в проект: ${selectedProject ? selectedProject.name : ""}`}
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                >
                    {loadingUsers ? (
                        <Spin />
                    ) : (
                        <List
                            itemLayout="horizontal"
                            dataSource={users}
                            renderItem={(user) => (
                                <List.Item actions={[<Button onClick={() => handleAddUserToProject(user.id)}>Добавить</Button>]}>
                                    <List.Item.Meta
                                        title={user.username}
                                    />
                                </List.Item>
                            )}
                        />
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default ProjectsListPage;

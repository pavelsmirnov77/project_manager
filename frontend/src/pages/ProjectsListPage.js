import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, Empty, Input} from "antd";
import MenuBar from "../components/MenuBar";
import projectService from "../services/projectService";
import {AppstoreAddOutlined} from "@ant-design/icons";

const {Search} = Input;

const ProjectsListPage = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.projects);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        projectService.getProjects(dispatch).then((data) => {
            setFilteredProjects(data);
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

    return (
        <div>
            <MenuBar/>
            <div style={{padding: "20px"}}>
                <Search
                    placeholder="Поиск по названию проекта"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{marginBottom: "150px", width: "500px", marginLeft: "200px"}}
                />
                {filteredProjects.length === 0 ? (
                    <Empty
                        image={<AppstoreAddOutlined style={{fontSize: 64, color: "rgba(0, 0, 0, 0.5)"}}/>}
                        description={<span style={{color: "rgba(0, 0, 0, 0.5)", fontSize: 20}}>Нет проектов</span>}
                    />
                ) : (
                    filteredProjects.map((project) => (
                        <Card
                            key={project.id}
                            title={project.name}
                            style={{marginBottom: "20px", marginLeft: "200px"}}
                        >
                            <p>Создатель: {project.userCreator.username}</p>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectsListPage;

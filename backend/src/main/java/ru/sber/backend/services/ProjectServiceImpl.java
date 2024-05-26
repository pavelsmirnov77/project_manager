package ru.sber.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import ru.sber.backend.entities.Project;
import ru.sber.backend.entities.Task;
import ru.sber.backend.entities.User;
import ru.sber.backend.repositories.ProjectRepository;
import ru.sber.backend.repositories.TaskRepository;
import ru.sber.backend.security.services.UserDetailsImpl;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    @Transactional
    public Project createProject(Project project) {
        long userId = getUserIdFromSecurityContext();
        project.setUser(new User(userId));
        return projectRepository.save(project);
    }

    @Override
    public Optional<Project> findProjectById(Long categoryId) {
        return projectRepository.findById(categoryId);
    }

    @Override
    public List<Project> findAllProjectByName(String name) {
        return projectRepository.findAllByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Project> findAllProjects() {
        long userId = getUserIdFromSecurityContext();
        return projectRepository.findAllByUser_Id(userId);
    }

    @Override
    public List<Task> getTasksByProjectId(Long projectId) {
        return projectRepository.findTasksByProjectId(projectId);
    }

    @Override
    public Project updateProject(Project updatedProject) {
        Project project = projectRepository.findById(updatedProject.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Проект не найден"));
        project.setName(updatedProject.getName());
        return projectRepository.save(project);
    }

    @Override
    @Transactional
    public boolean deleteProjectById(Long projectId) {
        projectRepository.deleteById(projectId);
        return true;
    }

    private long getUserIdFromSecurityContext() {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            return ((UserDetailsImpl) principal).getId();
        } else {
            throw new RuntimeException("Пользователь не найден");
        }
    }
}

package vkr.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import vkr.backend.entities.Project;
import vkr.backend.entities.Task;
import vkr.backend.entities.User;
import vkr.backend.repositories.ProjectRepository;
import vkr.backend.repositories.UserRepository;
import vkr.backend.security.services.UserDetailsImpl;
import vkr.backend.services.ProjectService;

import java.util.*;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public Project createProject(Project project) {
        long userId = getUserIdFromSecurityContext();
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        project.setUserCreator(user);
        project.getUsers().add(user);

        return projectRepository.save(project);
    }

    @Override
    @Transactional
    public void addUserToProject(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Проект не найден"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Пользователь не найден"));

        project.getUsers().add(user);
        projectRepository.save(project);
    }

    @Override
    @Transactional
    public void removeUserFromProject(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Проект не найден"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        project.getUsers().remove(user);
        projectRepository.save(project);
    }

    @Override
    public Set<User> getUsersByProjectId(Long projectId) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            Set<User> users = project.getUsers();
            users.add(project.getUserCreator());
            return users;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Проект не найден");
        }
    }

    @Override
    public Optional<Project> findProjectById(Long projectId) {
        return projectRepository.findById(projectId);
    }

    @Override
    public List<Project> findAllProjectByName(String name) {
        return projectRepository.findAllByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Project> findAllProjects() {
        long userId = getUserIdFromSecurityContext();
        return projectRepository.findAllByUserIdOrUserIn(userId);
    }

    @Override
    public List<Project> findAllProjectsForUser(Long userId) {
        List<Project> projectsCreatedByUser = projectRepository.findAllByUserCreator_Id(userId);

        List<Project> projectsUserAddedTo = projectRepository.findAllByUsers_Id(userId);

        Set<Project> allProjects = new HashSet<>(projectsCreatedByUser);
        allProjects.addAll(projectsUserAddedTo);

        return new ArrayList<>(allProjects);
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

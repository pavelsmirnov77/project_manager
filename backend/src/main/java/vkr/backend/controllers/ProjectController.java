package vkr.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vkr.backend.entities.Project;
import vkr.backend.entities.User;
import vkr.backend.services.ProjectService;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Slf4j
@RestController
@RequestMapping
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    /**
     * Создает проект
     *
     * @param project создаваемый проект
     * @return ответ об успешном создании проекта
     */
    @PostMapping("/todo/note")
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        Project createdProject = projectService.createProject(project);
        log.info("Добавление проекта с id: {}", createdProject.getId());

        return ResponseEntity.ok(createdProject);
    }

    /**
     * Добавляет пользователя в проект
     *
     * @param projectId id проекта
     * @param userId id пользователя
     * @return ответ об успешном добавлении пользователя в проект
     */
    @PostMapping("/todo/note/{projectId}/users/{userId}")
    public ResponseEntity<?> addUserToProject(@PathVariable Long projectId, @PathVariable Long userId) {
        try {
            projectService.addUserToProject(projectId, userId);
            log.info("Пользователь с id: {} добавлен в проект с id: {}", userId, projectId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Ошибка при добавлении пользователя с id: {} в проект с id: {}", userId, projectId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при добавлении пользователя в проект");
        }
    }

    /**
     * Удаляет пользователя из проекта
     *
     * @param projectId id проекта
     * @param userId id пользователя
     * @return ответ об успешном удалении пользователя из проекта
     */
    @DeleteMapping("/todo/note/{projectId}/users/{userId}")
    public ResponseEntity<?> removeUserFromProject(@PathVariable Long projectId, @PathVariable Long userId) {
        try {
            projectService.removeUserFromProject(projectId, userId);
            log.info("Пользователь с id: {} удален из проекта с id: {}", userId, projectId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Ошибка при удалении пользователя с id: {} из проекта с id: {}", userId, projectId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при удалении пользователя из проекта");
        }
    }

    /**
     * Получает список всех участников проекта
     *
     * @param projectId id проекта
     * @return список участников проекта
     */
    @GetMapping("/todo/note/{projectId}/users")
    public ResponseEntity<Set<User>> getUsersByProjectId(@PathVariable Long projectId) {
        Set<User> users = projectService.getUsersByProjectId(projectId);
        log.info("Получение всех пользователей проекта с id: {}", projectId);
        return ResponseEntity.ok(users);
    }

    /**
     * Получает список всех проектов, созданных пользователем или в которых пользователь был добавлен
     *
     * @param userId ID пользователя
     * @return список проектов
     */
    @GetMapping("/todo/note/{userId}")
    public ResponseEntity<List<Project>> getAllProjectsForUser(@PathVariable Long userId) {
        List<Project> projectsForUser = projectService.findAllProjectsForUser(userId);
        log.info("Получение всех проектов для пользователя с id: {}", userId);
        return ResponseEntity.ok(projectsForUser);
    }

    /**
     * Получает список проектов
     *
     * @return список проектов
     */
    @GetMapping("/todo/note")
    public ResponseEntity<List<Project>> getProjects() {
        log.info("Получаем список проектов");
        return ResponseEntity.ok().body(projectService.findAllProjects());
    }

    /**
     * Изменяет информацию о проекте
     *
     * @param projectId id проекта
     * @param project изменяемый проект
     * @return измененный проект
     */
    @PutMapping("/todo/note/{projectId}")
    public ResponseEntity<Project> updateProject(@PathVariable long projectId, @RequestBody Project project) {
        Optional<Project> optionalProject = projectService.findProjectById(projectId);
        log.info("Проект с id: {} изменен", projectId);
        if (optionalProject.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Project existingProject = optionalProject.get();
        existingProject.setName(project.getName());

        Project updatedProject = projectService.updateProject(existingProject);
        return ResponseEntity.ok(updatedProject);
    }

    /**
     * Удаляет проект из общего списка
     *
     * @param projectId id проекта
     * @return ответ об успешном или неуспешном удалении
     */
    @DeleteMapping("/todo/note/{projectId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long projectId) {
        log.info("Удаление проекта с id: {}", projectId);
        boolean isDeleted = projectService.deleteProjectById(projectId);
        if (isDeleted) {
            log.info("Проект успешно удалена");

            return ResponseEntity.noContent().build();
        } else {
            log.info("Проект не была удалена");

            return ResponseEntity.notFound().build();
        }
    }
}

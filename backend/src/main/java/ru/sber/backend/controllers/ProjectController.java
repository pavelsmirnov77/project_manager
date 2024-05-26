package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.entities.Project;
import ru.sber.backend.services.ProjectService;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/todo/note")
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
    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        Project createdProject = projectService.createProject(project);
        log.info("Добавление проекта с id: {}", createdProject.getId());

        return ResponseEntity.ok(createdProject);
    }

    /**
     * Получает список проектов
     *
     * @return список проектов
     */
    @GetMapping
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
    @PutMapping("/{projectId}")
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
    @DeleteMapping("/{projectId}")
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

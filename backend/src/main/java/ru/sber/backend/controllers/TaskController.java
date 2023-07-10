package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.entities.Task;
import ru.sber.backend.services.TaskService;

import java.net.URI;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("todo")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        long taskId = taskService.createTask(task);
        log.info("Добавление задачи с id: {}", taskId);

        return ResponseEntity.created(URI.create("todo/" + taskId)).build();
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<?> getTaskById(@PathVariable Long taskId) {
        log.info("Получаем задачу с id: {}", taskId);
        Optional<Task> task = taskService.findTaskById(taskId);
        if (task.isPresent()) {
            return ResponseEntity.ok().body(task.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<?> updateTask(@RequestBody Task task) {
        taskService.updateTask(task);
        log.info("Обновление информации о задаче");
        return ResponseEntity.ok().body(task);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        log.info("Удаление задачи с id: {}", taskId);
        boolean isDeleted = taskService.deleteTaskById(taskId);
        if (isDeleted) {
            log.info("Задача успешно удалена");

            return ResponseEntity.noContent().build();
        } else {
            log.info("Задача не была удалена");

            return ResponseEntity.notFound().build();
        }
    }
}

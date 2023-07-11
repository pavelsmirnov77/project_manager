package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.entities.ERegularity;
import ru.sber.backend.entities.Task;
import ru.sber.backend.services.TaskService;

import java.net.URI;
import java.util.Optional;

@Slf4j
@RestController
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

    @PutMapping("/archive/{taskId}")
    public ResponseEntity<String> addToArchive(@PathVariable("taskId") long taskId) {
        log.info("Добавление задачи с id: {} в архив", taskId);
        boolean addedToArchive = taskService.addToArchive(taskId);
        if (addedToArchive) {
            return ResponseEntity.ok("Задача добавлена в архив");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/regularity/{taskId}")
    public ResponseEntity<Task> changeTaskRegularity(@PathVariable Long taskId, @RequestBody ERegularity regularity) {
        log.info("Изменение регулярности задачи с id: {}", taskId);
        Task updatedTask = taskService.changeTaskRegularity(taskId, regularity);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/trash/{taskId}")
    public ResponseEntity<?> addToTrash(@PathVariable Long taskId) {
        taskService.addToTrash(taskId);
        return ResponseEntity.ok("Задача добавлена в корзину");
    }
}

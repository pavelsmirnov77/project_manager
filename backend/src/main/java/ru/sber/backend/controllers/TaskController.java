package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.entities.*;
import ru.sber.backend.services.PriorityService;
import ru.sber.backend.services.StatusService;
import ru.sber.backend.services.TaskService;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/todo/tasks")
public class TaskController {
    private final TaskService taskService;
    private final StatusService statusService;
    private final PriorityService priorityService;

    public TaskController(TaskService taskService, StatusService statusService, PriorityService priorityService) {
        this.taskService = taskService;
        this.statusService = statusService;
        this.priorityService = priorityService;
    }

    /**
     * Создает задачу
     *
     * @param task создаваемая задача
     * @return созданная задача
     */
    @PostMapping
    public ResponseEntity<?> createTask(@RequestParam("categoryId") long categoryId, @RequestBody Task task) {
        long taskId = taskService.createTask(task, categoryId);
        log.info("Добавление задачи с id: {}", taskId);

        return ResponseEntity.created(URI.create("/todo/tasks/" + taskId)).build();
    }

    /**
     * Получает задачу по id
     *
     * @param taskId id задачи
     * @return найденная задача по заданному id
     */
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

    /**
     * Получение всех задач
     *
     * @return список существующих задач
     */
    @GetMapping
    public List<Task> getTasks() {
        log.info("Получение всех задач");
        return taskService.findAllTasks();
    }

    @GetMapping("/project/{projectId}")
    public List<Task> findAllTasksByProjectId(@PathVariable long projectId) {
        return taskService.findAllTasksByProjectId(projectId);
    }

    /**
     * Обновляет информацию у задачи
     *
     * @param task изменяемая задача
     * @return ответ об успешном обновлении задачи
     */
    @PutMapping
    public ResponseEntity<?> updateTask(@RequestBody Task task) {
        taskService.updateTask(task);
        log.info("Обновление информации о задаче");
        return ResponseEntity.ok().body(task);
    }

    /**
     * Добавляет товар в корзину
     *
     * @param taskId id задачи
     * @return ответ об удачном добавлении в корзину
     */
    @DeleteMapping("/trash/{taskId}")
    public ResponseEntity<?> addToTrash(@PathVariable Long taskId) {
        taskService.addToTrash(taskId);
        return ResponseEntity.ok("Задача добавлена в корзину");
    }

    /**
     * Получает список статусов задачи
     *
     * @return список статусов задачи
     */
    @GetMapping("/statuses")
    public List<Status> getStatuses() {
        log.info("Получаение статусов");
        return statusService.findAllCategories();
    }

    /**
     * Получает список приоритетов задачи
     *
     * @return список приоритетов задачи
     */
    @GetMapping("/priorities")
    public List<Priority> getPriorities() {
        log.info("Получение приоритетов");
        return priorityService.findAllPrioriry();
    }

    @GetMapping("/status/{statusId}")
    public List<Task> findAllTasksByStatusId(@PathVariable Long statusId) {
        log.info("Получение всех задач по статусу с id: {}", statusId);
        return taskService.findTasksByStatuses(statusId);
    }

    /**
     * Обновляет статус задачи
     *
     * @param taskId  id задачи
     * @param statusId id нового статуса
     * @return ответ об успешном обновлении статуса задачи
     */
    @PutMapping("/{taskId}/status/{statusId}")
    public ResponseEntity<String> updateTaskStatus(@PathVariable("taskId") long taskId,
                                                   @PathVariable("statusId") long statusId) {
        log.info("Обновление статуса задачи с id: {} на статус с id: {}", taskId, statusId);
        boolean updated = taskService.updateTaskStatus(taskId, statusId);
        if (updated) {
            return ResponseEntity.ok("Статус задачи обновлен");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

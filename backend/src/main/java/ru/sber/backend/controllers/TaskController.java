package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> createTask(@RequestParam("projectId") long projectId, @RequestBody Task task) {
        long taskId = taskService.createTask(task, projectId);
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

    /**
     * Получает все задачи id проекта
     *
     * @param projectId id преокта
     * @return список задач
     */
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
        return statusService.findAllProjects();
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

    /**
     * Получает все задачи по id статуса
     *
     * @param statusId id статуса
     * @return список найденных задач
     */
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

    /**
     * Обновляет исполнителя задачи
     *
     * @param taskId id задачи
     * @param userId id пользователя, которого нужно закрепить за задачей
     * @return ответ о выполнении операции
     */
    @PutMapping("/{taskId}/assign/{userId}")
    public ResponseEntity<?> assignUserToTask(@PathVariable Long taskId, @PathVariable Long userId) {
        try {
            taskService.assignUserToTask(taskId, userId);
            return ResponseEntity.ok("Исполнитель задачи успешно обновлен");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Не удалось обновить исполнителя задачи: " + e.getMessage());
        }
    }

    /**
     * Обновляет трудозатраты задачи
     *
     * @param taskId id задачи
     * @param complexity новые трудозатраты
     * @return ответ об успешном обновлении трудозатрат
     */
    @PutMapping("/{taskId}/complexity")
    public ResponseEntity<?> updateTaskComplexity(@PathVariable long taskId, @RequestParam Integer complexity) {
        log.info("Обновление трудозатрат задачи с id: {}", taskId);
        boolean updated = taskService.updateTaskComplexity(taskId, complexity);
        if (updated) {
            return ResponseEntity.ok("Трудозатраты задачи обновлены");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Задача не найдена");
        }
    }

    /**
     * Обновляет текущие трудозатраты задачи
     *
     * @param taskId id задачи
     * @param currentComplexity новые текущие трудозатраты
     * @return ответ об успешном обновлении текущих трудозатрат
     */
    @PutMapping("/{taskId}/currentComplexity")
    public ResponseEntity<?> updateCurrentComplexity(@PathVariable long taskId, @RequestParam Integer currentComplexity) {
        log.info("Обновление текущих трудозатрат задачи с id: {}", taskId);
        boolean updated = taskService.updateCurrentComplexity(taskId, currentComplexity);
        if (updated) {
            return ResponseEntity.ok("Текущие трудозатраты задачи обновлены");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Задача не найдена");
        }
    }
}

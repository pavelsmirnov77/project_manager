package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.entities.*;
import ru.sber.backend.services.PriorityService;
import ru.sber.backend.services.RegularityService;
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
    private final RegularityService regularityService;

    public TaskController(TaskService taskService, StatusService statusService, PriorityService priorityService, RegularityService regularityService) {
        this.taskService = taskService;
        this.statusService = statusService;
        this.priorityService = priorityService;
        this.regularityService = regularityService;
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
     * Добавляет задачу в архив
     *
     * @param taskId id задачи
     * @return ответ об удачном или неудачном добавлении в архив
     */
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

    /**
     * Изменяет регулярность задачи
     *
     * @param taskId id задачи
     * @param regularity регулярность
     * @return ответ об удачном изменении регулярности
     */
    @PutMapping("/regularity/{taskId}")
    public ResponseEntity<Task> changeTaskRegularity(@PathVariable Long taskId, @RequestBody Regularity regularity) {
        log.info("Изменение регулярности задачи с id: {}", taskId);
        Task updatedTask = taskService.changeTaskRegularity(taskId, regularity);
        return ResponseEntity.ok(updatedTask);
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

    /**
     * Получает список регулярность задач
     *
     * @return список регулярность задач
     */
    @GetMapping("/regularities")
    public List<Regularity> getRegularities() {
        log.info("Получение регулярности");
        return regularityService.findAllRegularity();
    }
}

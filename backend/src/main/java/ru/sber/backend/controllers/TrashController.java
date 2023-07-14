package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.services.TrashService;

@Slf4j
@RestController
@RequestMapping("trash")
public class TrashController {
    private final TrashService trashService;

    public TrashController(TrashService trashService) {
        this.trashService = trashService;
    }

    /**
     * Удаляет задачу из корзины
     *
     * @param taskId id задачи
     * @return ответ об удачнои или неудачном удалении
     */
    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        log.info("Удаление задачи с id: {}", taskId);
        boolean isDeleted = trashService.deleteTaskById(taskId);
        if (isDeleted) {
            log.info("Задача успешно удалена");

            return ResponseEntity.noContent().build();
        } else {
            log.info("Задача не была удалена");

            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Восстанавливает задачу из корзины в общий список задач
     *
     * @param taskId id задачи
     * @return ответ об успешном восстановлении задачи
     */
    @PutMapping("/restore/{taskId}")
    public ResponseEntity<String> restoreFromTrash(@PathVariable Long taskId) {
        trashService.restoreFromTrash(taskId);
        return ResponseEntity.ok("Задача восстановлена из корзины");
    }
}

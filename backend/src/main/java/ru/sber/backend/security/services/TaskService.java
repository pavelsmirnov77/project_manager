package ru.sber.backend.security.services;

import ru.sber.backend.entities.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    /**
     * Создает задачу
     *
     * @param task создаваемая задача
     * @return id созданной задачи
     */
    long createTask(Task task);

    /**
     * Ищет задачу по  id
     *
     * @param taskId id задачи
     * @return задача с заданным id
     */
    Optional<Task> findTaskById(Long taskId);

    /**
     * Ищет все задачи с заданным именем
     *
     * @param titleTask заданное имя задачи
     * @return список задач с заданным именем
     */
    List<Task> findAllTasksByName(String titleTask);

    /**
     * Обновляет информацию о задаче
     *
     * @param task обновляемая задача
     * @return true, если обновлено удачно, иначе false
     */
    boolean updateTask(Task task);

    /**
     * Удаляет задачу с заданным id
     *
     * @param taskId id задачи
     * @return true, если удалено успешно, иначе false
     */
    boolean deleteTaskById(Long taskId);
}

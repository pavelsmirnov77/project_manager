package ru.sber.backend.services;

import ru.sber.backend.entities.*;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    /**
     * Создает задачу
     *
     * @param task создаваемая задача
     * @return id созданной задачи
     */
    long createTask(Task task, long categoryId);

    /**
     * Ищет задачу по  id
     *
     * @param taskId id задачи
     * @return задача с заданным id
     */
    Optional<Task> findTaskById(Long taskId);

    /**
     * Ищет все задачи
     *
     * @return список всех задач всех проектов
     */
    List<Task> findAllTasks();

    /**
     * Ищет все задачи в проекте по id проекта
     *
     * @param projectId id проекта
     * @return список задач в проекте
     */
    List<Task> findAllTasksByProjectId(long projectId);

    /**
     * Обновляет информацию о задаче
     *
     * @param task обновляемая задача
     * @return true, если обновлено удачно, иначе false
     */
    boolean updateTask(Task task);

    /**
     * Изменяет приоритет задачи
     *
     * @param taskId id задачи
     * @param priority приоритет
     * @return измененная задача
     */
    Task changeTaskPriority(long taskId, Priority priority);

    /**
     * Добавляет задачу в корзину
     *
     * @param taskId id добавляемой в корзину задачи
     */
    boolean addToTrash(Long taskId);

    /**
     * Находит задачи по списку идентификаторов статусов
     *
     * @param statusIds список идентификаторов статусов
     * @return список задач с указанными статусами
     */
    List<Task> findTasksByStatuses(Long statusIds);

    boolean updateTaskStatus(long taskId, long statusId);
}

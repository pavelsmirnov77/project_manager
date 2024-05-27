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

    /**
     * Обновляет статус задачи
     *
     * @param taskId id задачи
     * @param statusId id статуса
     * @return true - статус обновлен успешно, false - статус не обновлен
     */
    boolean updateTaskStatus(long taskId, long statusId);

    /**
     * Назначает человека ответственным за задачу по id
     *
     * @param taskId id задачи
     * @param userId id пользователя
     */
    void assignUserToTask(long taskId, Long userId);

    /**
     * Обновляет трудозатраты, которые планируется затратить на задачу (в часах)
     *
     * @param taskId id задачи
     * @param complexity трудозатраты в часах
     * @return true - трудозатраты обновлены удачно, false - неудачно
     */
    boolean updateTaskComplexity(long taskId, Integer complexity);

    /**
     * Обновляет трудозатраты, которые планируется затратить на задачу (в часах)
     *
     * @param taskId id задачи
     * @param currentComplexity затраченные трудозатраты в часах
     * @return true - затраченные трудозатраты обновлены удачно, false - неудачно
     */
    boolean updateCurrentComplexity(long taskId, Integer currentComplexity);
}

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
    long createTask(Task task);

    /**
     * Ищет задачу по  id
     *
     * @param taskId id задачи
     * @return задача с заданным id
     */
    Optional<Task> findTaskById(Long taskId);

    List<Task> findAllTasks();

    /**
     * Ищет все задачи с заданным именем
     *
     * @param titleTask заданное имя задачи
     * @return список задач с заданным именем
     */
    List<Task> findAllTasksByName(String titleTask);

    /**
     * Ищет все неархивные задачи
     *
     * @param title имя задачи
     * @return список неархивных задач
     */
    List<Task> findAllTaskNotArchived(String title);

    List<Task> findAllTasksByCategoryId(long categoryId);

    /**
     * Ищет все архивные задачи
     *
     * @param title имя задачи
     * @return список архивных задач
     */
    List<Task> findAllTaskArchived(String title);

    /**
     * Обновляет информацию о задаче
     *
     * @param task обновляемая задача
     * @return true, если обновлено удачно, иначе false
     */
    boolean updateTask(Task task);

    /**
     * Помечает задачу как архивированную
     *
     * @param taskId id задачи
     * @return true, если задача занесена в архив, иначе false
     */
    boolean addToArchive(long taskId);

    /**
     * Изменяет регулярность выполнения задачи
     *
     * @param taskId id задачи
     * @param regularity регулярность выполнения
     * @return измененная задача
     */
    Task changeTaskRegularity(long taskId, Regularity regularity);

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
}

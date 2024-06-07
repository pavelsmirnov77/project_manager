package vkr.backend.services;

import vkr.backend.entities.Project;
import vkr.backend.entities.Task;
import vkr.backend.entities.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ProjectService {
    /**
     * Создает проект
     *
     * @param project создаваемый проект
     * @return id созданного проекта
     */
    Project createProject(Project project);

    /**
     * Добавление пользователя в проект
     *
     * @param projectId id проекта
     * @param userId id добавляемого пользователя
     */
    void addUserToProject(Long projectId, Long userId);

    /**
     * Удаляет пользователя из проекта
     *
     * @param projectId id проекта
     * @param userId id удаляемого пользователя
     */
    void removeUserFromProject(Long projectId, Long userId);

    /**
     * Получает всех участников проекта
     *
     * @param projectId id проекта
     * @return список участников проекта
     */
    Set<User> getUsersByProjectId(Long projectId);

    /**
     * Получает все проекты пользователя
     *
     * @param userId id пользователя
     * @return список проектов пользователя
     */
    List<Project> findAllProjectsForUser(Long userId);

    /**
     * Ищет категорию по заданному id
     *
     * @param projectId id проекта
     * @return категория с заданным id
     */
    Optional<Project> findProjectById(Long projectId);

    /**
     * Ищет все проекты по заданному имени
     *
     * @param name название проекта
     * @return список проектов с заданным именем
     */
    List<Project> findAllProjectByName(String name);

    /**
     * Ищет все проекты
     *
     * @return список найденных проектов
     */
    List<Project> findAllProjects();

    /**
     * Обновляет проект
     *
     * @param project обновляемый проект
     * @return обновленный проект
     */
    Project updateProject(Project project);

    /**
     * Получает все задачи по заданному id проекта
     *
     * @param projectId id проекта
     * @return список задач по id проекта
     */
    List<Task> getTasksByProjectId(Long projectId);

    /**
     * Удаление проекта по заданному id
     *
     * @param projectId id категории
     * @return true, если проект успешно удален, иначе false
     */
    boolean deleteProjectById(Long projectId);
}

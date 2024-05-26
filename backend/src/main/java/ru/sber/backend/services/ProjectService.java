package ru.sber.backend.services;

import ru.sber.backend.entities.Project;
import ru.sber.backend.entities.Task;

import java.util.List;
import java.util.Optional;

public interface ProjectService {
    /**
     * Создает проект
     *
     * @param project создаваемый проект
     * @return id созданного проекта
     */
    Project createProject(Project project);

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

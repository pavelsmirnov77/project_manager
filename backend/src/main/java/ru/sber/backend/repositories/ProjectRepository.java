package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.Project;
import ru.sber.backend.entities.Task;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    /**
     * Получает задачи по id проекта
     *
     * @param projectId id проекта
     * @return список найденных задач в проекте с заданным id
     */
    @Query("SELECT t FROM Task t WHERE t.project.id = :projectId")
    List<Task> findTasksByProjectId(Long projectId);

    /**
     * Получает список всех проектов пользователя с заданным id
     *
     * @param userId id пользователя
     * @return список проектов пользователя
     */
    List<Project> findAllByUser_Id(long userId);

    /**
     * Ищет все проекты с заданным именем без учета регистра
     *
     * @param name название проекта
     * @return список найденных проектов
     */
    List<Project> findAllByNameContainingIgnoreCase(String name);
}

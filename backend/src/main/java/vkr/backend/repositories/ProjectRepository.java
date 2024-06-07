package vkr.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vkr.backend.entities.Project;
import vkr.backend.entities.Task;

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
    @Query("SELECT DISTINCT p FROM Project p JOIN p.users u WHERE p.userCreator.id = :userId OR u.id = :userId")
    List<Project> findAllByUserIdOrUserIn(Long userId);


    /**
     * Ищет все проекты с заданным именем без учета регистра
     *
     * @param name название проекта
     * @return список найденных проектов
     */
    List<Project> findAllByNameContainingIgnoreCase(String name);

    /**
     * Ищет список проектов по id создателя
     *
     * @param userId id создателя
     * @return список проектов
     */
    List<Project> findAllByUserCreator_Id(long userId);

    /**
     * Ищет список проектов по id пользователя, который участвует в этих проектах
     *
     * @param userId id пользователя
     * @return список проектов
     */
    List<Project> findAllByUsers_Id(long userId);
}

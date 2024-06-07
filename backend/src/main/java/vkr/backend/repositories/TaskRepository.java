package vkr.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vkr.backend.entities.Task;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    /**
     * Ищет задачу по id статуса
     *
     * @param statusId уникальный идентификатор статуса
     * @return список задач
     */
    List<Task> findTasksByStatusId(Long statusId);

}

package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.Task;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    /**
     * Ищет все задачи по названия без учета регистра
     *
     * @param titleTask имя задачи
     * @return список найденных задач с заданным именем
     */
    List<Task> findAllByTitleContainingIgnoreCase(String titleTask);

    /**
     * Ищет архивные задачи
     *
     * @param titleTask имя архивной задачи
     * @return список архивных задач
     */
    List<Task> findAllByTitleAndArchivedTrue(String titleTask);

    /**
     * Ищет неархивные задачи
     *
     * @param titleTask имя неархивной задачи
     * @return список неархивных задач
     */
    List<Task> findAllByTitleAndArchivedFalse(String titleTask);

    /**
     * Удаляет все задачи по заданному id категории
     *
     * @param categoryId id категории
     */
    void deleteAllByCategoryId(Long categoryId);
}

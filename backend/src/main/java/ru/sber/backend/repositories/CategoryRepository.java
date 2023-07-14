package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.Category;
import ru.sber.backend.entities.Task;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    /**
     * Получает задачи по id категории
     *
     * @param categoryId id категории
     * @return список найденных задач в категории с заданным id
     */
    @Query("SELECT t FROM Task t WHERE t.category.id = :categoryId")
    List<Task> findTasksByCategoryId(Long categoryId);

    /**
     * Получает список всех категорий пользователя с заданным id
     *
     * @param userId id пользователя
     * @return список категорий пользователя
     */
    List<Category> findAllByUser_Id(long userId);

    /**
     * Ищет все категории с заданным именем без учета регистра
     *
     * @param name название категории
     * @return список найденных категорий
     */
    List<Category> findAllByNameContainingIgnoreCase(String name);
}

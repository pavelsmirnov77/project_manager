package ru.sber.backend.security.services;

import ru.sber.backend.entities.Category;
import ru.sber.backend.entities.Task;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    /**
     * Создает категорию задач
     *
     * @param category создаваемая категория
     * @return id созданной категории
     */
    long createCategory(Category category);

    /**
     * Ищет категорию по заданному id
     *
     * @param categoryId id категории
     * @return категория с заданным id
     */
    Optional<Category> findCategoryById(Long categoryId);

    /**
     * Получает все задачи по заданному id категории
     *
     * @param categoryId id категории
     * @return список задач по id категории
     */
    List<Task> getTasksByCategoryId(Long categoryId);

    boolean deleteCategoryById(Long categoryId);
}

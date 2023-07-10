package ru.sber.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.Category;
import ru.sber.backend.entities.Task;
import ru.sber.backend.repositories.CategoryRepository;
import ru.sber.backend.repositories.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final TaskRepository taskRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, TaskRepository taskRepository) {
        this.categoryRepository = categoryRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public long createCategory(Category category) {
        return categoryRepository.save(category).getId();
    }

    @Override
    public Optional<Category> findCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId);
    }

    @Override
    public List<Task> getTasksByCategoryId(Long categoryId) {
        return categoryRepository.findTasksByCategoryId(categoryId);
    }

    @Override
    public boolean updateCategory(Category category) {
        categoryRepository.save(category);
        return true;
    }

    @Override
    public boolean deleteCategoryById(Long categoryId) {
        taskRepository.deleteAllByCategoryId(categoryId);
        categoryRepository.deleteById(categoryId);
        return true;
    }
}

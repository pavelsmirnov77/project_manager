package ru.sber.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ru.sber.backend.entities.Category;
import ru.sber.backend.entities.Task;
import ru.sber.backend.entities.User;
import ru.sber.backend.repositories.CategoryRepository;
import ru.sber.backend.repositories.TaskRepository;
import ru.sber.backend.security.services.UserDetailsImpl;

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
    public Category createCategory(Category category) {
        long userId = getUserIdFromSecurityContext();
        category.setUser(new User(userId));
        return categoryRepository.save(category);
    }

    @Override
    public Optional<Category> findCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId);
    }

    @Override
    public List<Category> findAllCategoryByName(String name) {
        return categoryRepository.findAllByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Category> findAllCategories() {
        long userId = getUserIdFromSecurityContext();
        return categoryRepository.findAllByUser_Id(userId);
    }

    @Override
    public List<Task> getTasksByCategoryId(Long categoryId) {
        return categoryRepository.findTasksByCategoryId(categoryId);
    }

    @Override
    public Category updateCategory(Category updatedCategory) {
        Category category = categoryRepository.findById(updatedCategory.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        category.setName(updatedCategory.getName());
        return categoryRepository.save(category);
    }

    @Override
    public boolean deleteCategoryById(Long categoryId) {
        categoryRepository.deleteById(categoryId);
        return true;
    }

    private long getUserIdFromSecurityContext() {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            return ((UserDetailsImpl) principal).getId();
        } else {
            throw new RuntimeException("Пользователь не найден");
        }
    }
}

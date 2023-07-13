package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.entities.Category;
import ru.sber.backend.services.CategoryService;

import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/todo/note")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * Создает категорию
     *
     * @param category создаваемая категория
     * @return ответ об успешном создании категории
     */
    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody Category category) {
        Category createdCategory = categoryService.createCategory(category);
        log.info("Добавление категории с id: {}", createdCategory.getId());

        return ResponseEntity.ok(createdCategory);
    }

    /**
     * Получает список категорий
     *
     * @return список категорий
     */
    @GetMapping
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok().body(categoryService.findAllCategories());
    }

    /**
     * Обновляет информацию о категории
     *
     * @param category обновляемая категория
     * @return ответ об успешном обновлении
     */
    @PutMapping
    public ResponseEntity<?> updateTask(@RequestBody Category category) {
        categoryService.updateCategory(category);
        log.info("Обновление информации о категории");
        return ResponseEntity.ok().body(category);
    }

    /**
     * Удаляет категорию из общего списка
     *
     * @param categoryId id категории
     * @return ответ об успешном или неуспешном удалении
     */
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long categoryId) {
        log.info("Удаление категории с id: {}", categoryId);
        boolean isDeleted = categoryService.deleteCategoryById(categoryId);
        if (isDeleted) {
            log.info("Категория успешно удалена");

            return ResponseEntity.noContent().build();
        } else {
            log.info("Категория не была удалена");

            return ResponseEntity.notFound().build();
        }
    }
}

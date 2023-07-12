package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.entities.Category;
import ru.sber.backend.services.CategoryService;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("todo/note")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody Category category) {
        long categoryId = categoryService.createCategory(category);
        log.info("Добавление категории с id: {}", categoryId);

        return ResponseEntity.created(URI.create("todo/note/" + categoryId)).build();
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long categoryId) {
        log.info("Получаем категорию с id: {}", categoryId);
        Optional<Category> category = categoryService.findCategoryById(categoryId);
        if (category.isPresent()) {
            return ResponseEntity.ok().body(category.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public List<Category> getCategoryByName(@RequestParam(required = false) String name) {
        if (name == null) {
            name = "";
            log.info("Вывод всех категорий");
        } else {
            log.info("Поиск категорий по имени {}", name);
        }

        return categoryService.findAllCategoryByName(name);
    }

    @PutMapping
    public ResponseEntity<?> updateTask(@RequestBody Category category) {
        categoryService.updateCategory(category);
        log.info("Обновление информации о категории");
        return ResponseEntity.ok().body(category);
    }

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

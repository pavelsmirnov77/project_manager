package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.Category;
import ru.sber.backend.entities.Task;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT t FROM Task t WHERE t.category.id = :categoryId")
    List<Task> findTasksByCategoryId(Long categoryId);

    List<Category> findAllByNameContainingIgnoreCase(String name);
}

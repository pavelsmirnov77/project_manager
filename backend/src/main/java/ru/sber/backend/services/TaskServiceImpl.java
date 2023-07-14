package ru.sber.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.*;
import ru.sber.backend.exceptions.NotFoundTask;
import ru.sber.backend.repositories.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TrashRepository trashRepository;
    private final CategoryService categoryService;
    private final PriorityRepository priorityRepository;
    private final RegularityRepository regularityRepository;
    private final StatusRepository statusRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, TrashRepository trashRepository, CategoryService categoryService, PriorityRepository priorityRepository, StatusRepository statusRepository, RegularityRepository regularityRepository, StatusRepository statusRepository1) {
        this.taskRepository = taskRepository;
        this.trashRepository = trashRepository;
        this.categoryService = categoryService;
        this.priorityRepository = priorityRepository;
        this.regularityRepository = regularityRepository;
        this.statusRepository = statusRepository1;
    }

    @Override
    public long createTask(Task task, long categoryId) {
        Optional<Category> optionalCategory = categoryService.findCategoryById(categoryId);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            task.setCategory(category);
        } else {
            throw new RuntimeException("Категория не найдена");
        }

        Priority priority = priorityRepository.findById(1L).orElseThrow(() -> new RuntimeException("Приоритет не найден"));
        task.setPriority(priority);

        Status status = statusRepository.findById(1L).orElseThrow(() -> new RuntimeException("Статус не найден"));
        task.setStatus(status);

        Regularity regularity = regularityRepository.findById(1L).orElseThrow(() -> new RuntimeException("Регулярность не найдена"));
        task.setRegularity(regularity);

        return taskRepository.save(task).getId();
    }

    @Override
    public Optional<Task> findTaskById(Long taskId) {
        return taskRepository.findById(taskId);
    }

    @Override
    public List<Task> findAllTasks() {
        List<Category> categories = categoryService.findAllCategories();
        List<Task> allTasks = new ArrayList<>();
        for (Category category : categories) {
            List<Task> tasksByCategory = findAllTasksByCategoryId(category.getId());
            allTasks.addAll(tasksByCategory);
        }
        return allTasks;
    }

    @Override
    public List<Task> findAllTasksByName(String titleTask) {
        return taskRepository.findAllByTitleContainingIgnoreCase(titleTask);
    }

    @Override
    public List<Task> findAllTaskNotArchived(String title) {
        return taskRepository.findAllByTitleAndArchivedFalse(title);
    }

    @Override
    public List<Task> findAllTasksByCategoryId(long categoryId) {
        return taskRepository.findAll()
                .stream()
                .filter(task -> task.getCategory().getId() == categoryId)
                .collect(Collectors.toList());
    }

    @Override
    public List<Task> findAllTaskArchived(String title) {
        return taskRepository.findAllByTitleAndArchivedTrue(title);
    }

    @Override
    public boolean updateTask(Task task) {
        if (task.getId() == null) {
            throw new RuntimeException("Идентификатор задачи не указан");
        }

        Optional<Task> existingTask = taskRepository.findById(task.getId());
        if (!existingTask.isPresent()) {
            throw new RuntimeException("Задача не найдена");
        }

        Task updatedTask = existingTask.get();
        updatedTask.setTitle(task.getTitle());
        updatedTask.setDescription(task.getDescription());

        taskRepository.save(updatedTask);
        return true;
    }

    @Override
    public boolean addToArchive(long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setArchived(true);
            taskRepository.save(task);
            return true;
        }
        else throw new NotFoundTask("Задача не найдена");
    }

    public Task changeTaskRegularity(long taskId, Regularity regularity) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setRegularity(regularity);
            return taskRepository.save(task);
        }
        else throw new NotFoundTask("Задача не найдена");
    }

    @Override
    public Task changeTaskPriority(long taskId, Priority priority) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setPriority(priority);
            return taskRepository.save(task);
        }
        else throw new NotFoundTask("Задача не найдена");
    }

    @Override
    public boolean addToTrash(Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            Trash trash = new Trash();
            trash.setTask(task);
            trash.setDeletionDate(LocalDateTime.now());
            trashRepository.save(trash);
            taskRepository.delete(task);
            return true;
        } else {
            return false;
        }
    }
}

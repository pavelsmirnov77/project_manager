package ru.sber.backend.services;

import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TrashRepository trashRepository;
    private final ProjectService projectService;
    private final PriorityRepository priorityRepository;
    private final StatusRepository statusRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, TrashRepository trashRepository, ProjectService projectService, PriorityRepository priorityRepository, StatusRepository statusRepository, StatusRepository statusRepository1) {
        this.taskRepository = taskRepository;
        this.trashRepository = trashRepository;
        this.projectService = projectService;
        this.priorityRepository = priorityRepository;
        this.statusRepository = statusRepository1;
    }

    @Override
    public long createTask(Task task, long categoryId) {
        Optional<Project> optionalCategory = projectService.findProjectById(categoryId);
        if (optionalCategory.isPresent()) {
            Project project = optionalCategory.get();
            task.setProject(project);
        } else {
            throw new RuntimeException("Категория не найдена");
        }

        Priority priority = priorityRepository.findById(1L).orElseThrow(() -> new RuntimeException("Приоритет не найден"));
        task.setPriority(priority);

        Status status = statusRepository.findById(1L).orElseThrow(() -> new RuntimeException("Статус не найден"));
        task.setStatus(status);

        return taskRepository.save(task).getId();
    }

    @Override
    public Optional<Task> findTaskById(Long taskId) {
        return taskRepository.findById(taskId);
    }

    @Override
    public List<Task> findAllTasks() {
        List<Project> categories = projectService.findAllProjects();
        List<Task> allTasks = new ArrayList<>();
        for (Project project : categories) {
            List<Task> tasksByCategory = findAllTasksByProjectId(project.getId());
            allTasks.addAll(tasksByCategory);
        }
        return allTasks;
    }

    @Override
    public List<Task> findAllTasksByProjectId(long categoryId) {
        return taskRepository.findAll()
                .stream()
                .filter(task -> task.getProject().getId() == categoryId)
                .collect(Collectors.toList());
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

    @Override
    public List<Task> findTasksByStatuses(Long statusIds) {
        return taskRepository.findTasksByStatusId(statusIds);
    }

    @Override
    public boolean updateTaskStatus(long taskId, long statusId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            Optional<Status> optionalStatus = statusRepository.findById(statusId);
            if (optionalStatus.isPresent()) {
                task.setStatus(optionalStatus.get());
                taskRepository.save(task);
                return true;
            } else {
                log.error("Статус с id {} не найден", statusId);
                return false;
            }
        } else {
            log.error("Задача с id {} не найдена", taskId);
            return false;
        }
    }
}

package vkr.backend.services.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vkr.backend.exceptions.NotFoundTask;
import vkr.backend.services.ProjectService;
import vkr.backend.services.StatisticsService;
import vkr.backend.services.TaskService;
import vkr.backend.entities.*;
import vkr.backend.repositories.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final ProjectService projectService;
    private final PriorityRepository priorityRepository;
    private final StatusRepository statusRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final StatisticsService statisticsService;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository,
                           ProjectService projectService,
                           PriorityRepository priorityRepository,
                           StatusRepository statusRepository,
                           UserRepository userRepository,
                           CommentRepository commentRepository,
                           StatisticsService statisticsService) {
        this.taskRepository = taskRepository;
        this.projectService = projectService;
        this.priorityRepository = priorityRepository;
        this.statusRepository = statusRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.statisticsService = statisticsService;
    }

    @Override
    @Transactional
    public long createTask(Task task, long projectId) {
        Optional<Project> optionalProject = projectService.findProjectById(projectId);
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();
            task.setProject(project);
        } else {
            throw new RuntimeException("Проект не найден");
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
        List<Project> projects = projectService.findAllProjects();
        List<Task> allTasks = new ArrayList<>();
        for (Project project : projects) {
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
                statisticsService.updateStatisticsOnTaskCompletion(taskId);
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

    @Override
    public void assignUserToTask(long taskId, Long userId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalTask.isPresent() && optionalUser.isPresent()) {
            Task task = optionalTask.get();
            User user = optionalUser.get();
            task.setAssignee(user);
            taskRepository.save(task);
            statisticsService.updateStatisticsOnTaskAssignment(userId, taskId);
        } else {
            throw new RuntimeException("Задача или пользователь не найдены");
        }
    }

    @Override
    public boolean updateTaskComplexity(long taskId, Integer complexity) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setComplexity(complexity);
            taskRepository.save(task);
            return true;
        } else {
            log.error("Задача с id {} не найдена", taskId);
            return false;
        }
    }

    @Override
    public boolean updateCurrentComplexity(long taskId, Integer currentComplexity) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setCurrentComplexity(currentComplexity);
            taskRepository.save(task);
            statisticsService.updateStatisticsOnTaskCurrentComplexity(task.getAssignee().getId(), task.getProject().getId(), currentComplexity);
            return true;
        } else {
            log.error("Задача с id {} не найдена", taskId);
            return false;
        }
    }

    @Override
    @Transactional
    public Comment addCommentToTask(Long taskId, Long userId, String content, byte[] fileContent) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalTask.isPresent() && optionalUser.isPresent()) {
            Task task = optionalTask.get();
            User user = optionalUser.get();

            Comment comment = new Comment();
            comment.setContent(content);
            comment.setTask(task);
            comment.setCreatedAt(LocalDateTime.now());
            comment.setUser(user);
            comment.setFileContent(fileContent);

            return commentRepository.save(comment);
        } else {
            throw new RuntimeException("Задача или пользователь не найдены");
        }
    }

    @Override
    public List<Comment> findCommentsByTaskId(Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            return commentRepository.findCommentsByTask(task);
        } else {
            throw new RuntimeException("Задача не найдена");
        }
    }
}

package ru.sber.backend.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.Task;
import ru.sber.backend.repositories.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public long createTask(Task task) {
        return taskRepository.save(task).getId();
    }

    @Override
    public Optional<Task> findTaskById(Long taskId) {
        return taskRepository.findById(taskId);
    }

    @Override
    public List<Task> findAllTasksByName(String titleTask) {
        return taskRepository.findAllByTitleContainingIgnoreCase(titleTask);
    }

    @Override
    public boolean updateTask(Task task) {
        taskRepository.save(task);
        return true;
    }

    @Override
    public boolean deleteTaskById(Long taskId) {
        taskRepository.deleteById(taskId);
        return true;
    }
}

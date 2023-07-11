package ru.sber.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.*;
import ru.sber.backend.exceptions.NotFoundTask;
import ru.sber.backend.repositories.TaskRepository;
import ru.sber.backend.repositories.TrashRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TrashRepository trashRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, TrashRepository trashRepository) {
        this.taskRepository = taskRepository;
        this.trashRepository = trashRepository;
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

    public Task changeTaskRegularity(long taskId, ERegularity regularity) {
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

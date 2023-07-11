package ru.sber.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.Task;
import ru.sber.backend.entities.Trash;
import ru.sber.backend.exceptions.NotFoundTask;
import ru.sber.backend.repositories.TaskRepository;
import ru.sber.backend.repositories.TrashRepository;

import java.util.Optional;

@Service
public class TrashServiceImpl implements TrashService {

    private final TaskRepository taskRepository;

    private final TrashRepository trashRepository;

    @Autowired
    public TrashServiceImpl(TaskRepository taskRepository, TrashRepository trashRepository) {
        this.taskRepository = taskRepository;
        this.trashRepository = trashRepository;
    }

    @Override
    public boolean deleteTaskById(Long taskId) {
        taskRepository.deleteById(taskId);
        return true;
    }

    @Override
    public void restoreFromTrash(Long taskId) {
        Optional<Trash> optionalTrash = trashRepository.findById(taskId);
        if (optionalTrash.isPresent()) {
            Trash trash = optionalTrash.get();
            Task task = trash.getTask();
            taskRepository.save(task);
            trashRepository.delete(trash);
        } else {
            throw new NotFoundTask("Задача не найдена с id:  " + taskId);
        }
    }
}

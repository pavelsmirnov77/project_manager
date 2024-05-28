package vkr.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vkr.backend.repositories.TaskRepository;
import vkr.backend.services.TrashService;

@Service
public class TrashServiceImpl implements TrashService {

    private final TaskRepository taskRepository;

    @Autowired
    public TrashServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public boolean deleteTaskById(Long taskId) {
        taskRepository.deleteById(taskId);
        return true;
    }
}

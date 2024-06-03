package vkr.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vkr.backend.entities.Statistics;
import vkr.backend.entities.Task;
import vkr.backend.entities.User;
import vkr.backend.repositories.StatisticsRepository;
import vkr.backend.repositories.TaskRepository;
import vkr.backend.repositories.UserRepository;
import vkr.backend.services.StatisticsService;

import java.util.List;
import java.util.Optional;

@Service
public class StatisticsServiceImpl implements StatisticsService {

    @Autowired
    private StatisticsRepository statisticsRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Statistics getStatisticsByUserId(Long userId) {
        return statisticsRepository.findByUserId(userId).orElse(new Statistics());
    }

    @Override
    public List<Statistics> getAllStatistics() {
        return statisticsRepository.findAll();
    }

    @Override
    @Transactional
    public void updateStatisticsOnTaskAssignment(Long userId, Long taskId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));

        Optional<Statistics> optionalStatistics = statisticsRepository.findByUserIdAndProjectId(userId, task.getProject().getId());
        Statistics statistics = optionalStatistics.orElseGet(() -> new Statistics(user, task.getProject(), 0, 0, 0L));

        statistics.setAllTasks(statistics.getAllTasks() + 1);
        statisticsRepository.save(statistics);
    }

    @Override
    @Transactional
    public void updateStatisticsOnTaskCompletion(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));

        if (task.getStatus().getId() == 5) {
            Optional<Statistics> optionalStatistics = statisticsRepository.findByUserIdAndProjectId(task.getAssignee().getId(), task.getProject().getId());
            Statistics statistics = optionalStatistics.orElseThrow(() -> new RuntimeException("Statistics not found"));

            statistics.setCompletedTasks(statistics.getCompletedTasks() + 1);
            statisticsRepository.save(statistics);
        }
    }

    @Override
    @Transactional
    public void updateStatisticsOnTaskCurrentComplexity(Long userId, Long projectId, Integer currentComplexity) {
        Optional<Statistics> optionalStatistics = statisticsRepository.findByUserIdAndProjectId(userId, projectId);
        Statistics statistics = optionalStatistics.orElseThrow(() -> new RuntimeException("Statistics not found"));

        statistics.setHoursSpent(statistics.getHoursSpent() + currentComplexity);
        statisticsRepository.save(statistics);
    }
}


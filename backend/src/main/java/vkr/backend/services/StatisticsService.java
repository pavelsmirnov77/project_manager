package vkr.backend.services;

import vkr.backend.entities.Statistics;
import vkr.backend.entities.User;

import java.util.List;

public interface StatisticsService {
    /**
     * Получает статистику пользователь по его id
     *
     * @param userId id пользователя
     * @return статистика пользователя
     */
    Statistics getStatisticsByUserId(Long userId);

    /**
     * Список статистики всех пользователей
     *
     * @return список статистики
     */
    List<Statistics> getAllStatistics();

    /**
     * Обновление статистики после того как пользователь стал ответственным по задаче
     *
     * @param userId id пользователя
     * @param taskId id задачи
     */
    void updateStatisticsOnTaskAssignment(Long userId, Long taskId);

    /**
     * Обновление статистики после того как она стала выполненной
     *
     * @param taskId id задачи
     */
    void updateStatisticsOnTaskCompletion(Long taskId);

    /**
     * Обновление трудозатрат пользователя
     *
     * @param userId id пользователя
     * @param projectId id проекта
     * @param currentComplexity текущие трудозатраты этого пользователя по проекту
     */
    void updateStatisticsOnTaskCurrentComplexity(Long userId, Long projectId, Integer currentComplexity);
}

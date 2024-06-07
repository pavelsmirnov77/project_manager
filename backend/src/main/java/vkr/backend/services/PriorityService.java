package vkr.backend.services;

import vkr.backend.entities.Priority;

import java.util.List;

public interface PriorityService {
    /**
     * Ищет все приоритеты
     *
     * @return список приоритетов
     */
    List<Priority> findAllPrioriry();
}

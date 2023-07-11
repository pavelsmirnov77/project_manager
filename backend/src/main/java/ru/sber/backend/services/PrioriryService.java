package ru.sber.backend.services;

import ru.sber.backend.entities.Priority;

import java.util.List;

public interface PrioriryService {
    /**
     * Ищет все приоритеты
     *
     * @return список приоритетов
     */
    List<Priority> findAllPrioriry();
}

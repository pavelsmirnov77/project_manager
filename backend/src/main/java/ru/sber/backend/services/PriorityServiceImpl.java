package ru.sber.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.Priority;
import ru.sber.backend.repositories.PriorityRepository;

import java.util.List;

@Service
public class PriorityServiceImpl implements PriorityService {
    private final PriorityRepository priorityRepository;

    @Autowired
    public PriorityServiceImpl(PriorityRepository priorityRepository) {
        this.priorityRepository = priorityRepository;
    }

    @Override
    public List<Priority> findAllPrioriry() {
        return priorityRepository.findAll();
    }
}

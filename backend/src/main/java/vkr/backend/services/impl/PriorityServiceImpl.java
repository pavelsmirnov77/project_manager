package vkr.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vkr.backend.entities.Priority;
import vkr.backend.repositories.PriorityRepository;
import vkr.backend.services.PriorityService;

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

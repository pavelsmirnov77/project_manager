package vkr.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vkr.backend.entities.Status;
import vkr.backend.repositories.StatusRepository;
import vkr.backend.services.StatusService;

import java.util.List;

@Service
public class StatusServiceImpl implements StatusService {
    private final StatusRepository statusRepository;

    @Autowired
    public StatusServiceImpl(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    @Override
    public List<Status> findAllProjects() {
        return statusRepository.findAll();
    }
}

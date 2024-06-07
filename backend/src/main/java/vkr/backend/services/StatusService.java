package vkr.backend.services;

import vkr.backend.entities.Status;

import java.util.List;

public interface StatusService {
    List<Status> findAllProjects();
}

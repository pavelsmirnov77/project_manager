package ru.sber.backend.services;

import ru.sber.backend.entities.Status;

import java.util.List;

public interface StatusService {
    List<Status> findAllProjects();
}

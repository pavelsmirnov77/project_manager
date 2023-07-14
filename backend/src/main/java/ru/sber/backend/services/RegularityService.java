package ru.sber.backend.services;

import ru.sber.backend.entities.Regularity;

import java.util.List;

public interface RegularityService {
    List<Regularity> findAllRegularity();
}

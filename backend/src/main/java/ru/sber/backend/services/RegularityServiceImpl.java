package ru.sber.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.Regularity;
import ru.sber.backend.repositories.RegularityRepository;

import java.util.List;

@Service
public class RegularityServiceImpl implements RegularityService {
    private final RegularityRepository regularityRepository;

    @Autowired
    public RegularityServiceImpl(RegularityRepository regularityRepository) {
        this.regularityRepository = regularityRepository;
    }

    @Override
    public List<Regularity> findAllRegularity() {
        return regularityRepository.findAll();
    }
}

package ru.sber.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.Priority;
import ru.sber.backend.repositories.PrioriryRepository;

import java.util.List;

@Service
public class PrioriryServiceImpl implements PrioriryService{
    private final PrioriryRepository prioriryRepository;

    @Autowired
    public PrioriryServiceImpl(PrioriryRepository prioriryRepository) {
        this.prioriryRepository = prioriryRepository;
    }

    @Override
    public List<Priority> findAllPrioriry() {
        return prioriryRepository.findAll();
    }
}

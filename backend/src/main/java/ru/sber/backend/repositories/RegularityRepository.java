package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.Regularity;

@Repository
public interface RegularityRepository extends JpaRepository<Regularity, Long> {
}

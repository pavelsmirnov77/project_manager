package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.Priority;

@Repository
public interface PriorityRepository extends JpaRepository<Priority, Long> {
}

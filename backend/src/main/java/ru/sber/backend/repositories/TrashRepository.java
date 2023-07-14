package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.Trash;

@Repository
public interface TrashRepository extends JpaRepository<Trash, Long> {
}

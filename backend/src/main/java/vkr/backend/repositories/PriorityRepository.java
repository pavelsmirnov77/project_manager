package vkr.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vkr.backend.entities.Priority;

@Repository
public interface PriorityRepository extends JpaRepository<Priority, Long> {
}

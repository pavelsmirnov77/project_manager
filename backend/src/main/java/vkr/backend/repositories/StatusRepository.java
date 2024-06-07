package vkr.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vkr.backend.entities.Status;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
}

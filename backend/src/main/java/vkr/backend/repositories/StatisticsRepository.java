package vkr.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vkr.backend.entities.Statistics;

import java.util.List;
import java.util.Optional;

@Repository
public interface StatisticsRepository extends JpaRepository<Statistics, Long> {
    Optional<Statistics> findByUserId(Long userId);
    Optional<Statistics> findByUserIdAndProjectId(Long userId, Long projectId);
    List<Statistics> findAll();
}

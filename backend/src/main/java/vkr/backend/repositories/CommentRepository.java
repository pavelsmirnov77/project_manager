package vkr.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vkr.backend.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}

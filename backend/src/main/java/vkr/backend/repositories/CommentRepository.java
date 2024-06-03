package vkr.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vkr.backend.entities.Comment;
import vkr.backend.entities.Task;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findCommentsByTask(Task task);
}

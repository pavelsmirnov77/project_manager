package vkr.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vkr.backend.entities.Message;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByDialogId(Long dialogId);
}

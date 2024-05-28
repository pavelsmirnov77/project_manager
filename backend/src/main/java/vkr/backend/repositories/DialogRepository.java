package vkr.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vkr.backend.entities.Dialog;

import java.util.List;
import java.util.Optional;

public interface DialogRepository extends JpaRepository<Dialog, Long> {
    /**
     * Ищет диалог по id отправителя и получателя.
     *
     * @param senderId id отправителя
     * @param recipientId id получателя
     * @return найденный диалог, если существует
     */
    Optional<Dialog> findBySenderIdAndRecipientId(Long senderId, Long recipientId);

    /**
     * Ищет все диалоги по id пользователя
     *
     * @param userId id пользователя
     * @return список диалогов
     */
    @Query("SELECT d FROM Dialog d WHERE d.sender.id = :userId OR d.recipient.id = :userId")
    List<Dialog> findAllByUserId(Long userId);

    /**
     * Удаляет диалог по id
     *
     * @param id id диалога
     */
    void deleteById(Long id);
}

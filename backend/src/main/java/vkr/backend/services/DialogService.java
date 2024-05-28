package vkr.backend.services;

import vkr.backend.entities.Dialog;

import java.util.List;
import java.util.Optional;

public interface DialogService {
    /**
     * Получает диалог по id отправителя и получателя
     *
     * @param senderId id отправителя
     * @param recipientId id получателя
     * @return найденный диалог, если существует
     */
    Optional<Dialog> getDialog(Long senderId, Long recipientId);

    /**
     * Создает новый диалог
     *
     * @param senderId id отправителя
     * @param recipientId id получателя
     * @return созданный диалог
     */
    Dialog createDialog(Long senderId, Long recipientId);

    /**
     * Удаляет диалог по id
     *
     * @param id id диалога
     */
    void deleteDialog(Long id);

    /**
     * Ищет все диалоги для пользователя
     *
     * @param userId id пользователя
     * @return список диалогов
     */
    List<Dialog> findAllDialogsByUserId(Long userId);
}

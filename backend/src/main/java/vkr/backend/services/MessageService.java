package vkr.backend.services;

import vkr.backend.entities.Message;

import java.util.List;

public interface MessageService {

    /**
     * Отправляет сообщение в указанном диалоге
     *
     * @param dialogId    id диалога, в котором отправляется сообщение
     * @param senderId    id отправителя сообщения
     * @param recipientId id получателя сообщения
     * @param text        Текст сообщения
     * @return Отправленное сообщение
     * @throws IllegalArgumentException если диалог или пользователи не найдены
     */
    Message sendMessage(Long dialogId, Long senderId, Long recipientId, String text);

    /**
     * Редактирует текст сообщения
     *
     * @param messageId id сообщения, которое нужно отредактировать
     * @param newText   Новый текст сообщения
     * @return Обновленное сообщение
     * @throws IllegalArgumentException если сообщение не найдено
     */
    Message editMessage(Long messageId, String newText);

    /**
     * Удаляет сообщение по его id
     *
     * @param messageId id сообщения, которое нужно удалить
     * @throws IllegalArgumentException если сообщение не найдено
     */
    void deleteMessage(Long messageId);

    /**
     * Получает все сообщения в указанном диалоге
     *
     * @param dialogId id диалога, сообщения которого нужно получить
     * @return Список сообщений в диалоге
     */
    List<Message> getMessagesByDialogId(Long dialogId);
}

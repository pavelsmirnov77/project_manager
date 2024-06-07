package vkr.backend.services.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vkr.backend.entities.Dialog;
import vkr.backend.entities.Message;
import vkr.backend.entities.User;
import vkr.backend.repositories.DialogRepository;
import vkr.backend.repositories.MessageRepository;
import vkr.backend.repositories.UserRepository;
import vkr.backend.services.MessageService;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private DialogRepository dialogRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Message sendMessage(Long dialogId, Long senderId, Long recipientId, String text) {
        log.info("Отправка сообщения: dialogId={}, senderId={}, recipientId={}, text={}", dialogId, senderId, recipientId, text);

        Optional<Dialog> dialogOpt = dialogRepository.findById(dialogId);
        Optional<User> senderOpt = userRepository.findById(senderId);
        Optional<User> recipientOpt = userRepository.findById(recipientId);

        if (dialogOpt.isPresent() && senderOpt.isPresent() && recipientOpt.isPresent()) {
            Message message = new Message();
            message.setDialog(dialogOpt.get());
            message.setSender(senderOpt.get());
            message.setRecipient(recipientOpt.get());

            String encodedText = encode(text);
            message.setText(encodedText);
            message.setSentAt(LocalDateTime.now());

            Message savedMessage = messageRepository.save(message);
            log.info("Сообщение успешно отправлено: {}", savedMessage);
            return savedMessage;
        }

        log.error("Ошибка при отправке сообщения: неверный dialogId или userId");
        throw new IllegalArgumentException("Ошибка при отправке сообщения: неверный dialogId или userId");
    }

    @Override
    public Message editMessage(Long messageId, String newText) {
        log.info("Редактирование сообщения: messageId={}, newText={}", messageId, newText);

        Optional<Message> messageOpt = messageRepository.findById(messageId);

        if (messageOpt.isPresent()) {
            Message message = messageOpt.get();

            Base64.getDecoder().decode(message.getText());

            String encodedText = Base64.getEncoder().encodeToString(newText.getBytes(StandardCharsets.UTF_8));
            message.setText(encodedText);
            Message updatedMessage = messageRepository.save(message);

            log.info("Сообщение успешно отредактировано: {}", updatedMessage);
            return updatedMessage;
        }

        log.error("Ошибка при редактировании сообщения: сообщение с ID {} не найдено", messageId);
        throw new IllegalArgumentException("Сообщение не найдено");
    }

    @Override
    public void deleteMessage(Long messageId) {
        log.info("Удаление сообщения: messageId={}", messageId);

        if (messageRepository.existsById(messageId)) {
            messageRepository.deleteById(messageId);
            log.info("Сообщение успешно удалено: messageId={}", messageId);
        } else {
            log.error("Ошибка при удалении сообщения: сообщение с ID {} не найдено", messageId);
            throw new IllegalArgumentException("Сообщение не найдено");
        }
    }

    @Override
    public List<Message> getMessagesByDialogId(Long dialogId) {
        log.info("Получение сообщений для диалога: dialogId={}", dialogId);

        List<Message> messages = messageRepository.findByDialogId(dialogId);

        if (messages.isEmpty()) {
            log.info("Сообщения не найдены для диалога с ID {}", dialogId);
        } else {
            for (Message message : messages) {
                String decodedText = decode(message.getText());
                message.setText(decodedText);
            }
            log.info("Сообщения успешно получены для диалога с ID {}: {}", dialogId, messages);
        }

        return messages;
    }

    private String encode(String text) {
        return Base64.getEncoder().encodeToString(text.getBytes(StandardCharsets.UTF_8));
    }

    private String decode(String encodedText) {
        return new String(Base64.getDecoder().decode(encodedText), StandardCharsets.UTF_8);
    }
}

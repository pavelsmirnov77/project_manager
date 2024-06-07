package vkr.backend.services.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vkr.backend.entities.Dialog;
import vkr.backend.entities.User;
import vkr.backend.repositories.DialogRepository;
import vkr.backend.services.DialogService;

import java.util.List;
import java.util.Optional;

@Service
public class DialogServiceImpl implements DialogService {
    private static final Logger log = LoggerFactory.getLogger(DialogServiceImpl.class);

    @Autowired
    private DialogRepository dialogRepository;

    @Override
    public Optional<Dialog> getDialog(Long senderId, Long recipientId) {
        log.info("Получение диалога между отправителем с id {} и получателем с id {}", senderId, recipientId);
        Optional<Dialog> dialog = dialogRepository.findBySenderIdAndRecipientId(senderId, recipientId);
        if (!dialog.isPresent()) {
            log.warn("Диалог между отправителем с id {} и получателем с id {} не найден", senderId, recipientId);
        }
        return dialog;
    }

    @Override
    public Dialog createDialog(Long senderId, Long recipientId) {
        log.info("Создание диалога между отправителем с id {} и получателем с id {}", senderId, recipientId);
        Dialog dialog = new Dialog();
        dialog.setSender(new User(senderId));
        dialog.setRecipient(new User(recipientId));
        dialog = dialogRepository.save(dialog);
        log.info("Диалог успешно создан с id {}", dialog.getId());
        return dialog;
    }

    @Override
    public void deleteDialog(Long id) {
        log.info("Удаление диалога с id {}", id);
        dialogRepository.deleteById(id);
        log.info("Диалог с id {} успешно удален", id);
    }

    @Override
    public List<Dialog> findAllDialogsByUserId(Long userId) {
        log.info("Поиск всех диалогов для пользователя с id {}", userId);
        List<Dialog> dialogs = dialogRepository.findAllByUserId(userId);
        log.info("Найдено {} диалогов для пользователя с id {}", dialogs.size(), userId);
        return dialogs;
    }
}

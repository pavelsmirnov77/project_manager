package vkr.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vkr.backend.entities.Message;
import vkr.backend.services.MessageService;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public Message sendMessage(@RequestParam Long dialogId, @RequestParam Long senderId, @RequestParam Long recipientId, @RequestParam String text) {
        return messageService.sendMessage(dialogId, senderId, recipientId, text);
    }

    @PutMapping("/edit/{id}")
    public Message editMessage(@PathVariable Long id, @RequestParam String newText) {
        return messageService.editMessage(id, newText);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMessage(@PathVariable Long id) {
        messageService.deleteMessage(id);
    }

    @GetMapping("/dialog/{dialogId}")
    public List<Message> getMessagesByDialogId(@PathVariable Long dialogId) {
        return messageService.getMessagesByDialogId(dialogId);
    }
}

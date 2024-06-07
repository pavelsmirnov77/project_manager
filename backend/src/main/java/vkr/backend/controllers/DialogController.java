package vkr.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vkr.backend.entities.Dialog;
import vkr.backend.services.DialogService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dialogs")
public class DialogController {
    @Autowired
    private DialogService dialogService;

    @GetMapping("/find")
    public Optional<Dialog> getDialog(@RequestParam Long senderId, @RequestParam Long recipientId) {
        return dialogService.getDialog(senderId, recipientId);
    }

    @PostMapping("/create")
    public Dialog createDialog(@RequestParam Long senderId, @RequestParam Long recipientId) {
        return dialogService.createDialog(senderId, recipientId);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteDialog(@PathVariable Long id) {
        dialogService.deleteDialog(id);
    }

    @GetMapping("/user/{userId}")
    public List<Dialog> getAllDialogsByUserId(@PathVariable Long userId) {
        return dialogService.findAllDialogsByUserId(userId);
    }
}

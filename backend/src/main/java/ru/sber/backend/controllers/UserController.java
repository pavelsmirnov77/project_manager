package ru.sber.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.sber.backend.entities.User;
import ru.sber.backend.services.UserServiceImpl;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserServiceImpl userService;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("/{userId}/profile-picture")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable String userId, @RequestParam("file") MultipartFile file) {
        try {
            byte[] profilePicture = file.getBytes();
            userService.updateProfilePicture(Long.valueOf(userId), profilePicture);
            return new ResponseEntity<>("Изображение загружено успешно!", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Ошибка загрузки изображения!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{userId}/profile-picture")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable String userId) {
        byte[] profilePicture = userService.getProfilePicture(Long.parseLong(userId));
        if (profilePicture != null) {
            return ResponseEntity.ok().body(profilePicture);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{userId}/name")
    public ResponseEntity<String> updateUserName(@PathVariable String userId, @RequestBody Map<String, String> request) {
        try {
            String newName = request.get("name");
            userService.updateUserName(Long.valueOf(userId), newName);
            return new ResponseEntity<>("ФИО пользователя успешно обновлено!", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Ошибка обновления ФИО пользователя: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{userId}/group")
    public ResponseEntity<String> updateUserGroup(@PathVariable String userId, @RequestBody Map<String, String> request) {
        try {
            String newGroup = request.get("study_group");
            userService.updateUserGroup(Long.valueOf(userId), newGroup);
            return new ResponseEntity<>("Учебная группа пользователя успешно обновлена!", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Ошибка обновления учебной группы пользователя: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok().body(users);
    }
}


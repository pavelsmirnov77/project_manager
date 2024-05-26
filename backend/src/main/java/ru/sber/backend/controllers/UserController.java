package ru.sber.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.sber.backend.services.UserServiceImpl;

import java.io.IOException;

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
            return new ResponseEntity<>("Profile picture uploaded successfully", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to upload profile picture", HttpStatus.INTERNAL_SERVER_ERROR);
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
}


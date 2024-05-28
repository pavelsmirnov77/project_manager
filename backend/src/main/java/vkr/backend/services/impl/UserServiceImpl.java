package vkr.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vkr.backend.entities.User;
import vkr.backend.repositories.UserRepository;
import vkr.backend.services.UserService;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public long signUp(User user) {
        return userRepository.save(user).getId();
    }

    @Override
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    @Transactional
    public void updateProfilePicture(Long userId, byte[] profilePicture) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setProfilePicture(profilePicture);
            userRepository.save(user);
        } else {
            throw new RuntimeException("Пользователь с id: " + userId + " не найден");
        }
    }

    public byte[] getProfilePicture(long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.map(User::getProfilePicture).orElse(null);
    }

    @Transactional
    public void updateUserName(Long userId, String newName) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setName(newName);
            userRepository.save(user);
        } else {
            throw new RuntimeException("Пользователь с id: " + userId + " не найден");
        }
    }

    @Transactional
    public void updateUserGroup(Long userId, String newGroup) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setStudyGroup(newGroup);
            userRepository.save(user);
        } else {
            throw new RuntimeException("Пользователь с id: " + userId + " не найден");
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}

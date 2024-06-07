package vkr.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vkr.backend.entities.User;
import vkr.backend.repositories.UserRepository;
import vkr.backend.services.AdminService;

import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;

    @Autowired
    public AdminServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public boolean deleteUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            userRepository.deleteById(userId);
            return true;
        } else {
            return false;
        }
    }

    @Transactional
    public boolean blockUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User userToBlock = user.get();
            userToBlock.setBlocked(true);
            userRepository.save(userToBlock);
            return true;
        } else {
            return false;
        }
    }

    @Transactional
    public boolean unblockUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User userToUnblock = user.get();
            userToUnblock.setBlocked(false);
            userRepository.save(userToUnblock);
            return true;
        } else {
            return false;
        }
    }
}


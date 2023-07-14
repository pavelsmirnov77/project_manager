package ru.sber.backend.services;

import ru.sber.backend.entities.User;

import java.util.Optional;

public interface UserService {
    /**
     * регистрирует пользователя
     *
     * @param user регистрируемый пользователь
     * @return id пользователя
     */
    long signUp(User user);

    /**
     * ищет пользователя по id
     *
     * @param userId id пользователя
     * @return найденный пользователь
     */
    Optional<User> getUserById(long userId);
}

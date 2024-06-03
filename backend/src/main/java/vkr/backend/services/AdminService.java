package vkr.backend.services;

public interface AdminService {
    /**
     * Удаляет пользователя
     *
     * @param userId id пользователя
     * @return true - пользователь успешно удален, иначе false
     */
    boolean deleteUserById(Long userId);

    /**
     * Блокирует пользователя
     *
     * @param userId id пользователя
     * @return true - пользователь успешно заблокирован, иначе false
     */
    boolean blockUserById(Long userId);

    /**
     * Разблокирует пользователя
     *
     * @param userId id пользователя
     * @return true - пользователь успешно разблокирован, иначе false
     */
    boolean unblockUserById(Long userId);
}

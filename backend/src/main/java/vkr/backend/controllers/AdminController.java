package vkr.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vkr.backend.services.AdminService;

@Slf4j
@RestController
@RequestMapping("/api/admin/users")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    /**
     * Удаляет пользователя
     *
     * @param userId id пользователя
     * @return ответ об успешном или неуспешном удалении
     */
    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        log.info("Удаление пользователя с id: {}", userId);
        boolean isDeleted = adminService.deleteUserById(userId);
        if (isDeleted) {
            log.info("Пользователь успешно удален");
            return ResponseEntity.noContent().build();
        } else {
            log.error("Пользователь с id: {} не найден", userId);
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Блокирует пользователя
     *
     * @param userId id пользователя
     * @return ответ об успешной или неуспешной блокировке
     */
    @PutMapping("/{userId}/block")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> blockUser(@PathVariable Long userId) {
        log.info("Блокировка пользователя с id: {}", userId);
        boolean isBlocked = adminService.blockUserById(userId);
        if (isBlocked) {
            log.info("Пользователь успешно заблокирован");
            return ResponseEntity.ok("Пользователь заблокирован");
        } else {
            log.error("Пользователь с id: {} не найден", userId);
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Разблокирует пользователя
     *
     * @param userId id пользователя
     * @return ответ об успешной или неуспешной разблокировке
     */
    @PutMapping("/{userId}/unblock")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> unblockUser(@PathVariable Long userId) {
        log.info("Разблокировка пользователя с id: {}", userId);
        boolean isUnblocked = adminService.unblockUserById(userId);
        if (isUnblocked) {
            log.info("Пользователь успешно разблокирован");
            return ResponseEntity.ok("Пользователь разблокирован");
        } else {
            log.error("Пользователь с id: {} не найден", userId);
            return ResponseEntity.notFound().build();
        }
    }
}

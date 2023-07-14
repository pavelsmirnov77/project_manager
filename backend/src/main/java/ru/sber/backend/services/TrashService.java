package ru.sber.backend.services;

public interface TrashService {
    /**
     * Удаляет задачу с заданным id
     *
     * @param taskId id задачи
     * @return true, если удалено успешно, иначе false
     */
    boolean deleteTaskById(Long taskId);

    /**
     * Восстанавливает задачу из корзины
     *
     * @param taskId id восстанавливаемой задачи
     */
    void restoreFromTrash(Long taskId);
}

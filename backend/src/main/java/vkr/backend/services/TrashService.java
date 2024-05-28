package vkr.backend.services;

public interface TrashService {
    /**
     * Удаляет задачу с заданным id
     *
     * @param taskId id задачи
     * @return true, если удалено успешно, иначе false
     */
    boolean deleteTaskById(Long taskId);
}

package ru.sber.backend.exceptions;

public class NotFoundTask extends RuntimeException {
    /**
     * Исключение, выбрасывающее сообщение об отсутствии задачи
     *
     * @param message сообщение об ошибке
     */
    public NotFoundTask(String message) {
        super(message);
    }
}

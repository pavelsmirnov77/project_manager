package ru.sber.backend.entities.response;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String accessToken;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    private String name;
    private String studyGroup;

    public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles, String name, String studyGroup) {
        this.accessToken = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.name = name;
        this.studyGroup = studyGroup;
    }
}

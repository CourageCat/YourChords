package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserResponeDTO {

    private Long id;
    private String username;
    private String fullName;
    private String gender;
    private String role;
    private String phone;
    private String mail;
    private int status;
    private LocalDateTime createAt;
    private String avatar;
    private String address;

    private String professional;
    private String prize;
    private int year;

    public UserResponeDTO(String fullName) {
        this.fullName = fullName;
    }

    public UserResponeDTO(int status){ this.status = status; }

    public UserResponeDTO(Long id, String fullName, String phone, String mail) {
        this.id = id;
        this.fullName = fullName;
        this.phone = phone;
        this.mail = mail;
    }

    public UserResponeDTO(String username, String fullName, String role, String mail, int status, LocalDateTime createAt, String avatar) {
        this.username = username;
        this.fullName = fullName;
        this.role = role;
        this.mail = mail;
        this.status = status;
        this.createAt = createAt;
        this.avatar = avatar;
    }

    public UserResponeDTO(Long id, String fullName) {
        this.id = id;
        this.fullName = fullName;
    }

    public UserResponeDTO(Long id, String username, String fullName, String gender, String role, String mail, int status, LocalDateTime createAt, String phoneNumber) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.gender = gender;
        this.role = role;
        this.createAt = createAt;
        this.status = status;
        this.phone = phoneNumber;
        this.mail = mail;
    }

    public UserResponeDTO(Long id, String username, String fullName, String gender, String role, String mail, int status, LocalDateTime createAt, String phoneNumber, String avatar) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.gender = gender;
        this.role = role;
        this.createAt = createAt;
        this.status = status;
        this.phone = phoneNumber;
        this.mail = mail;
        this.avatar = avatar;
    }

    public UserResponeDTO(Long id, String username, String role, String mail, LocalDateTime createAt, int status, String avatar) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.createAt = createAt;
        this.status = status;
        this.mail = mail;
        this.avatar = avatar;
    }

    public UserResponeDTO(Long id, String username, String fullName, String gender, LocalDateTime createAt, String phoneNumber, String mail) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.gender = gender;
        this.createAt = createAt;
        this.phone = phoneNumber;
        this.mail = mail;
    }

    public UserResponeDTO(Long id, String username, String fullName, String phoneNumber, String mail) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.phone = phoneNumber;
        this.mail = mail;
    }

    public UserResponeDTO(Long id, String username, String fullName, String role, String mail, int status, String avatar) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.role = role;
        this.status = status;
        this.mail = mail;
        this.avatar = avatar;
    }

    public UserResponeDTO(Long id, String username, String fullName, String role, String mail, int status, String avatar, LocalDateTime createAt) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.role = role;
        this.status = status;
        this.mail = mail;
        this.avatar = avatar;
        this.createAt = createAt;
    }
}

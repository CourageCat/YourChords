package com.example.demo.dto;

import com.example.demo.validator.Password;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterDTO {

    @NotNull(message = "Customer Name must be not null")
    @NotBlank(message = "Customer Name must be not blank")
    @Size(min = 6, message = "Customer Name must be at least 6 characters")
    private String userName;

    @NotNull(message = "Full Name must be not null")
    @NotBlank(message = "Full Name must be not blank")
    private String fullName;

    @NotNull (message = "Password must be not null")
    @NotBlank (message = "Password must be not blank")
    @Password
    private String password;

    @NotBlank(message = "Email must not be blank")
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@(gmail\\.com|gmail\\.com\\.vn|fpt\\.edu\\.vn)$", message = "Please provide a valid email")
    private String email;

    private String role;

}

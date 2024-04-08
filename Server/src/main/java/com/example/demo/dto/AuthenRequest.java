package com.example.demo.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AuthenRequest {
    private String username;
    private String password;
}

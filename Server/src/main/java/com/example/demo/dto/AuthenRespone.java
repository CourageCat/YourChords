package com.example.demo.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AuthenRespone {
    private String token;
    private String msg;
}

package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ReportSongResponseDTO {
    private Long id;
    private Long userId;
    private String username;
    private String content;
    private LocalDateTime localDateTime;
}

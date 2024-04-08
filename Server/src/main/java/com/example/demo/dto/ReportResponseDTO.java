package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportResponseDTO {

    private Long id;
    private Long userId;
    private String username;
    private String content;
    private LocalDateTime localDateTime;

    private UserResponeDTO user;

    public ReportResponseDTO(Long id, LocalDateTime localDateTime, String content, UserResponeDTO user, UserResponeDTO userReported) {
        this.id = id;
        this.content = content;
        this.user = user;
        this.userReported = userReported;
        this.localDateTime = localDateTime;
    }

    public ReportResponseDTO(Long id, LocalDateTime localDateTime, String content, UserResponeDTO userReported) {
        this.id = id;
        this.content = content;
        this.userReported = userReported;
        this.localDateTime = localDateTime;
    }

    private UserResponeDTO userReported;

}

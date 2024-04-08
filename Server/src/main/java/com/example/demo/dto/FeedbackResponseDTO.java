package com.example.demo.dto;

import com.example.demo.entity.Beat;
import com.example.demo.entity.User;
import com.example.demo.repository.BeatRepository;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackResponseDTO {
    private String content;
    private UserResponeDTO user;
    private BeatResponseDTO beat;
    private LocalDateTime createAt;
    private Long id;

    public FeedbackResponseDTO(Long id, String content, UserResponeDTO user, LocalDateTime createAt, BeatResponseDTO beat) {
        this.id = id;
        this.content = content;
        this.user = user;
        this.beat = beat;
        this.createAt = createAt;
    }
}

package com.example.demo.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentSongResponseDTO {
    private Long id;
    private Long parentId;
    private String content;
    private Long userId;
    private String username;
    private Long songId;
    private LocalDateTime localDateTime;
    private List<CommentSongResponseDTO> subComment;
    private String avatar;

}

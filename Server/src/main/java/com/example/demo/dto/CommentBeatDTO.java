package com.example.demo.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentBeatDTO {
    private Long id;
    private Long parentId;
    private String content;
    private Long userId;
    private Long beatId;
    private int status;
    private List<CommentBeatDTO> subComment;
}

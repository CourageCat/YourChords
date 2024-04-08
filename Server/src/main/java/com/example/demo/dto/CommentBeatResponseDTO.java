package com.example.demo.dto;

import com.example.demo.entity.Beat;
import com.example.demo.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter

public class CommentBeatResponseDTO {
    private Long id;
    private Long parentId;
    private String content;
    private UserResponeDTO userId;
    private BeatResponseDTO beatId;
    private int status;
    private List<CommentBeatResponseDTO> subComment;
}

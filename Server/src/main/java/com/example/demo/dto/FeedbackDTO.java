package com.example.demo.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {
    private Long id;
    private String content;
    private Long userId;
    private Long beatId;

}

package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportDTO {

    private Long userId;
    private Long songId;
    private String content;

    private Long UserReported;
    private Long beatId;

}

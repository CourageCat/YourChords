package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class SongReportResponseDTO {
    private Long id;
    private String songName;
    private Long userid;
    private String userfullname;
    private LocalDateTime createAt;
    private int status;
    private int reports;
}

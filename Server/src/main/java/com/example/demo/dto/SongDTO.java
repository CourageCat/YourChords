package com.example.demo.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SongDTO {


    private String songName;
    private String singer;
    private Long userid;
    private String description;
    private String tone;
    private String vocalRange;
    private String songUrl;
    private List<String> genres;
}

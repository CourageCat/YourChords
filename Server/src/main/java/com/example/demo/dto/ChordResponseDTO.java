package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Builder
public class ChordResponseDTO {
    private Long id;
    private String chordName;
    private String image;
    private String key;
    private String suffix;
    private String description;
    private String type;

    public ChordResponseDTO(Long id, String chordName, String image) {
        this.id = id;
        this.chordName = chordName;
        this.image = image;
    }

    public ChordResponseDTO(Long id, String chordName, String image, String key, String suffix, String type, String description) {
        this.id = id;
        this.chordName = chordName;
        this.image = image;
        this.key = key;
        this.suffix = suffix;
        this.type = type;
        this.description = description;
    }

}

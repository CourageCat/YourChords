package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class GenreResponseDTO {
    private Long id;
    private String name;
    private String description;

    public GenreResponseDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}

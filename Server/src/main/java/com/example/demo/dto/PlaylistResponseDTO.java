package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PlaylistResponseDTO {
    private Long id;
    private String name;
    private Long userid;
    private LocalDateTime createAt;
    private List<SongResponseDTO> songs;
    private int quantityOfSong;

    public PlaylistResponseDTO(Long id, String name, Long userid, LocalDateTime createAt, int quantityOfSong) {
        this.id = id;
        this.name = name;
        this.userid = userid;
        this.createAt = createAt;
        this.quantityOfSong = quantityOfSong;
    }

    public PlaylistResponseDTO(Long id, String name, Long userid, LocalDateTime createAt, List<SongResponseDTO> songs) {
        this.id = id;
        this.name = name;
        this.userid = userid;
        this.createAt = createAt;
        this.songs = songs;
    }
}

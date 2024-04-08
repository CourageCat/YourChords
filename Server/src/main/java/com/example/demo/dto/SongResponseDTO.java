package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SongResponseDTO {
    private Long id;
    private String songName;
    private String singer;
    private Long userid;
    private String userfullname;
    private String description;
    private String tone;
    private String vocalRange;
    private String songUrl;
    private LocalDateTime createAt;
    private List<GenreResponseDTO> genres;
    private List<ChordResponseDTO> chords;
    private int totalLike;
    private int view;
    private double rating;
    private int reports;
    private int status;

    public SongResponseDTO(Long id, String songName, String singer, LocalDateTime createAt, Long userid, int totalLike, int view, double rating) {
        this.id = id;
        this.songName = songName;
        this.singer = singer;
        this.createAt = createAt;
        this.userid = userid;
        this.view = view;
        this.totalLike = totalLike;
        this.rating = rating;
    }

    public SongResponseDTO(Long id, String songName, String singer, LocalDateTime createAt, Long userid, String userfullname, int totalLike, int view, double rating, int statuss) {
        this.id = id;
        this.songName = songName;
        this.singer = singer;
        this.createAt = createAt;
        this.userid = userid;
        this.userfullname = userfullname;
        this.view = view;
        this.totalLike = totalLike;
        this.rating = rating;
        this.status = status;
    }
}

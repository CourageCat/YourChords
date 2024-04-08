package com.example.demo.dto;

import com.example.demo.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BeatResponseDTO {
    private Long id;
    private String beatName;
    private String beatSound;
    private UserResponeDTO user;
    private Double price;
    private LocalDateTime creatAt;
    private int view;
    private int totalLike;
    private Set<User> userSet;
    private List<GenreResponseDTO> genres;
    private int cmt;
    private String vocalRange;
    private int totalRating;
    private Double rating;
    private String description;
    private int status;
    private List<BeatResponseDTO> list;

    private String prize;
    private int year;
    private String professional;

    private OrderResponseDTO orderInformation;


    public BeatResponseDTO(Long id, String beatName, String beatSound, UserResponeDTO user, Double price, LocalDateTime creatAt, List<GenreResponseDTO> genres, int view, int totalLike, String vocalRange,int totalRating, Double rating, int status) {
        this.id = id;
        this.beatName = beatName;
        this.beatSound = beatSound;
        this.user = user;
        this.price = price;
        this.creatAt = creatAt;
        this.view = view;
        this.genres = genres;
        this.totalLike = totalLike;
        this.vocalRange = vocalRange;
        this.totalRating = totalRating;
        this.rating = rating;
        this.status=status;

    }

    public BeatResponseDTO(String beatName, UserResponeDTO user, Double price) {
        this.beatName = beatName;
        this.user = user;
        this.price = price;
    }
    public BeatResponseDTO(Long id, String beatName, UserResponeDTO user, Double price, LocalDateTime creatAt, List<GenreResponseDTO> genres, int view, int totalLike, String vocalRange,int totalRating, Double rating, int status) {
        this.id = id;
        this.beatName = beatName;
        this.user = user;
        this.price = price;
        this.creatAt = creatAt;
        this.view = view;
        this.genres = genres;
        this.totalLike = totalLike;
        this.vocalRange = vocalRange;
        this.totalRating = totalRating;
        this.rating = rating;
        this.status = status;
    }

//    public BeatResponseDTO(String beatName, byte[] beatSound, Double price,String description) {
//        this.beatName = beatName;
//        this.beatSound = beatSound;
//        this.price = price;
//        this.description = description;
//    }

    public BeatResponseDTO(String beatName) {
        this.beatName = beatName;
    }

    @Override
    public String toString() {
        return "BeatDTO{" +
                "beatName='" + beatName + '\'' +
                ", beatSound='" + beatSound + '\'' +
                ", username='" + user + '\'' +
                ", price=" + price +
                '}';
    }
}
package com.example.demo.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "SongRating")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SongRating {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int rating;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @ManyToOne
    @JsonIgnore
    @JoinColumn (name = "songId")
    private Song songOfRating;

    @ManyToOne
    @JsonIgnore
    @JoinColumn (name = "userId")
    private User rateByUser;

    public SongRating(User rateByUser, Song songOfRating, int rating) {
        this.rating = rating;
        this.songOfRating = songOfRating;
        this.rateByUser = rateByUser;
    }
}

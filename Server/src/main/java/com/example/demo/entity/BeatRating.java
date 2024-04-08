package com.example.demo.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "BeatRating")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BeatRating {
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
    @JoinColumn (name = "beatID")
    private Beat beatRating;

    @ManyToOne
    @JsonIgnore
    @JoinColumn (name = "userId")
    private User userRatingBeat;

    public BeatRating( User userRatingBeat, Beat beatRating,int rating) {
        this.rating = rating;
        this.beatRating = beatRating;
        this.userRatingBeat = userRatingBeat;
    }
}

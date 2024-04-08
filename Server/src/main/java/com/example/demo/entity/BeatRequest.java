package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "BeatRequest")
public class BeatRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column
    private String description;

    @Column
    private String beatName;

    @Column
    private Double price;

    @Column(name = "Date")
    private LocalDateTime createdAt;

    @Column(length = Integer.MAX_VALUE)
    private String beatSoundDemo;

    @Column(length = Integer.MAX_VALUE)
    private String beatSoundFull;


    @Column(length = Integer.MAX_VALUE)
    private String objectName;

    @Column(length = Integer.MAX_VALUE)
    private String objectNameDemo;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userRequest")
    private User userRequest;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "requestId")
    private MusicianRequest requestId;

    @Column
    private int status;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public BeatRequest(String description, User userRequest, String beatName) {
        this.description = description;
        this.userRequest = userRequest;
        this.beatName = beatName;
    }
}

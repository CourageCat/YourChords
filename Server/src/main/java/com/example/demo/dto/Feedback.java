package com.example.demo.dto;

import com.example.demo.entity.Beat;
import com.example.demo.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Table (name = "Feedback")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @Column
    private int status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userId")
    private User userFeedback;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "BeatId")
    private Beat beatFeedback;



    public Feedback( String content, User userFeedback, Beat beatFeedback, int status) {
        this.content = content;
        this.userFeedback = userFeedback;
        this.beatFeedback = beatFeedback;
        this.status = status;
    }
}

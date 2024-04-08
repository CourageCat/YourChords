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
@Table(name = "BeatComment")
@Entity
public class BeatComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @Column
    private int status;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userId")
    private User userCommentBeat;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "BeatId")
    private Beat beatComment;

    @ManyToOne
    @JoinColumn(name = "parentID")
    private BeatComment parentComment;

    public BeatComment(String content, User userCommentBeat, Beat beatComment, BeatComment parentComment, int status) {
        this.content = content;
        this.status = status;
        this.userCommentBeat = userCommentBeat;
        this.beatComment = beatComment;
        this.parentComment = parentComment;
    }
}

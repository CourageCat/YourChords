package com.example.demo.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "SongComment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SongComment {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @ManyToOne
    @JsonIgnore
    @JoinColumn (name = "songId")
    private Song songOfComment;

    @ManyToOne
    @JsonIgnore
    @JoinColumn (name = "userId")
    private User commentByUsers;

    @ManyToOne
    @JoinColumn(name = "parentID")
    private SongComment parentComment;

    public SongComment(String content, User commentByUsers, Song songOfComment, SongComment parentComment) {
        this.content = content;
        this.commentByUsers = commentByUsers;
        this.songOfComment = songOfComment;
        this.parentComment = parentComment;
    }
}
